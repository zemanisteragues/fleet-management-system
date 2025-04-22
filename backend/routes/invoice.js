const express = require("express");
const router = express.Router();
const db = require("../db");
const {
    body,
    validationResult
} = require("express-validator");
require('dotenv').config();
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/uploadMiddleware");
const { createInvoice } = require("./createInvoice.js");

router.post('/fetchInvoiceDetails', verifyToken, async (req, res) => {
    try {
        const {
            customerId,
            dutySlipsIds
        } = req.body;
        let result = {};
        // console.log('customerId', customerId);
        // console.log('dutySlipsIds: ', dutySlipsIds);
        // fetch customer details
        const query = `SELECT * FROM customers WHERE id = ?`;
        const customer = await db.query(query, [customerId]);
        result.customer = customer[0];

        // fetch duty slips
        const dutySlipsQuery = `SELECT * FROM duty_slips WHERE id IN (?) ORDER BY id DESC`;
        const dutySlips = await db.query(dutySlipsQuery, [dutySlipsIds]);
        result.dutySlips = dutySlips[0];

        // fetch duty slips items
        const dutySlipsItemsGetQuery = `
                SELECT
                td.*,
                c.id AS carId,
                c.registrationNumber as registrationNumber,
                c.carType AS carType,
                d.id AS driverId,
                ds.passengerName AS passengerName,
                CONCAT(d.firstName, ' ', d.lastName) AS driverName,
                cu.id AS customerId,
                CASE
                WHEN cu.isCompany = '1' THEN cu.companyName
                ELSE CONCAT(cu.firstName, ' ', cu.lastName)
                END AS customerName
            FROM
                trip_details AS td
            JOIN duty_slips AS ds ON td.dutySlipId = ds.id
            JOIN cars AS c ON ds.carId = c.id
            JOIN drivers AS d ON ds.driverId = d.id
            JOIN customers AS cu ON ds.customerId = cu.id
            WHERE
                ds.id IN (?);
        `
        const dutySlipsItems = await db.query(dutySlipsItemsGetQuery, [dutySlipsIds]);
        result.dutySlipsItems = dutySlipsItems[0];

        // query to check last inserted invoice id
        const lastInvoiceIdQuery = `SELECT id FROM invoices ORDER BY id DESC LIMIT 1`;
        const lastInvoiceId = await db.query(lastInvoiceIdQuery);
        const lastInvoiceIdValue = lastInvoiceId[0][0]?.id || 0;

        result.invoiceNumber = lastInvoiceIdValue + 1;
        
        // query to update the status of the duty slips
        // for (let ids of dutySlipsIds) {
        //     db.query(`UPDATE bookings SET status = 'close', invoice_id = ? WHERE id = ?; `,[result.invoiceNumber , ids]);
        //     console.log(result.invoiceNumber , " " , ids);
        // }

        // const results = await db.query(query, [customerId, dutySlipIds]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: 'Error in fetching invoice details, please try again later',
            errorDetails: error
        });
    }

});

router.post('/invoice', verifyToken, async (req, res) => {
    try {
        const invoiceData = req.body;
        createInvoice(invoiceData, `uploads/${invoiceData.invoiceNumber}.pdf`);
        const invoicesResults = await db.query(
            'INSERT INTO invoices (invoice_number, billed_to, gstin, customer_id, customer_phone, address, shipped_to, representative, place_of_service, invoice_date, cgst, sgst, igst, total, sub_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [invoiceData.invoiceNumber, invoiceData.billedTo, invoiceData.gstin, invoiceData.customerId, invoiceData.customerPhone, invoiceData.address, invoiceData.shippedTo, JSON.stringify(invoiceData.representative), invoiceData.placeOfService, new Date(invoiceData.invoiceDate), invoiceData.cgst, invoiceData.sgst, invoiceData.igst, invoiceData.total, invoiceData.subTotal]
        );

        const invoiceId = invoicesResults[0].insertId;
        // console.log(req.body);
        for (let trip of invoiceData.trips) {
            await db.query(
                'INSERT INTO invoices_trips (invoice_id, trip_id, duty_slip_id, start_date, release_date, starting_km, closing_km, total_km, pickup_location, drop_location, fare, fuel_per_km, toll, night_halt, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [invoiceId, trip.id, trip.dutySlipId, new Date(trip.start_date), new Date(trip.release_date), trip.startingKm, trip.closingKm, trip.totalKM, trip.pickupLocation, trip.dropLocation, trip.fare, trip.fuelPerKM, trip.toll, trip.nightHalt, trip.total]
            );
            // console.log(trip.dutySlipId + ' ' + trip.duty_slip_id);
            await db.query(
                'UPDATE duty_slips SET invoiceId = ? WHERE id = ?',
                [invoiceId, trip.dutySlipId]
            );
        }

        res.status(201).json({
            success: true,
            message: 'Invoice and related trips saved successfully.'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while saving the invoice.',
            error
        });
    }
});

router.delete('/invoice', verifyToken, async (req, res) => {

    try {
        const invoiceId = req.body.id;

        await db.query(
            'UPDATE invoices SET isActive = 0 WHERE id = ?',
            [invoiceId]
        );

        await db.query(
            `UPDATE duty_slips SET status = 'close', invoice_id = NULL WHERE invoice_id = ?`,
            [invoiceId]
        );

        res.status(200).json({ success: true, message: 'Invoice deleted successfully.' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while deleting the invoice.', error });
    }
});

router.post('/invoiceStatus', verifyToken, async (req, res) => {
    try {
        const invoiceId = req.body.invoiceId;
        const newStatus = req.body.status;

        await db.query(
            'UPDATE invoices SET invoice_status = ? WHERE id = ?',
            [newStatus, invoiceId]
        );
        // console.log(invoiceId , " ", newStatus);
        if(newStatus === 'CANCELLED') {
            await db.query(
                `UPDATE bookings SET invoice_id = NULL, status = 'open' WHERE invoice_id = ?`,
                [invoiceId]
            );
        }

        const [invoices] = await db.query(
            'SELECT * FROM invoices ORDER BY createdDate ASC'
        );

        res.status(200).json({ success: true, message: 'Invoice status updated successfully.', invoices });

    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while updating the invoice status.', error });
    }
});

router.get('/invoices', verifyToken, async (req, res) => {
    try {
        const [invoices] = await db.query(
            'SELECT * FROM invoices ORDER BY createdDate DESC'
        );

        res.status(200).json({ success: true, invoices });

    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while fetching the invoices.', error });
    }
});

router.post('/submitInvoice' , verifyToken , async (req , res)=> {
    try {
        const {  invoiceData } = req.body
        const {selectedDutySlips} = req.body;
        const invoiceDataNew = invoiceData.details;
        const dutySlipIds = invoiceData.dutySlips
        const taxDetails = invoiceData.data;
        // const dutyData = await db.query('SELECT * FROM bookings where id = (?)',[dutySlipIds]);
        // console.log(req.body);
        createInvoice(invoiceDataNew , taxDetails, selectedDutySlips, `uploads/${invoiceDataNew.invoiceNumber}.pdf`);
        const invoicesResults = await db.query(
            'INSERT INTO invoices (invoice_number, billed_to, gstin, customer_id, customer_phone, address, shipped_to, representative, place_of_service, invoice_date, cgst, sgst, igst, grand_total, sub_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [invoiceDataNew.invoiceNumber, invoiceDataNew.billedTo, invoiceDataNew.gstin, invoiceDataNew.customerId, invoiceDataNew.customerPhone, invoiceDataNew.address, invoiceDataNew.shippedTo, JSON.stringify(invoiceDataNew.representative), invoiceDataNew.placeOfService, new Date(invoiceDataNew.invoiceDate), taxDetails.cgst, taxDetails.sgst, taxDetails.igst, taxDetails.grandTotal, taxDetails.subTotal]
        );

        const invoiceId = invoicesResults[0].insertId;

         // query to update the status of the duty slips
        for (let ids of dutySlipIds) {
            console.log('called');
            db.query(`UPDATE bookings SET status = 'close', invoice_id = ? WHERE id = ?; `,[invoiceId , ids]);
            console.log(invoiceId , " " , ids);
        }
        res.status(200).json({message: 'successfully Created invoice'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'internal server error'})   
    }
})

module.exports = router;