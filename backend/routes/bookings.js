const express = require('express');
const router = express.Router();
const db = require("../db");
require('dotenv').config();
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/uploadMiddleware");

router.post("/bookings", async(req, res) => {
    const {pageIndex, pageSize, customerId, dutyTypeStatus, dateRange, query} = req.body;
    const offset = (pageIndex - 1) * pageSize;
    const limit = pageSize;

    try {
        let whereConditions = '';
        let params = [`%${query}%`];

        if (customerId) {
            whereConditions += 'bookings.customer_id = ? ';
            params.push(customerId);
        }
        
        if (dutyTypeStatus !== 'all') {
            const dutyTypeStatusArray = dutyTypeStatus.split(',').map(item => item.trim());
            if (whereConditions !== '') 
                whereConditions += 'AND ';
            whereConditions += `bookings.dutyType IN (${dutyTypeStatusArray.map(() => '?').join(",")}) `;
            params = [...params, ...dutyTypeStatusArray];
        }

        if(query) {
            whereConditions += `bookedByPassengerName LIKE ?`
        }

        const updatedSql = `SELECT SQL_CALC_FOUND_ROWS bookings.*,
            IF(customers.isCompany, customers.companyName, CONCAT(customers.firstName, ' ', customers.lastName)) AS customerName,
            CONCAT(drivers.firstName, ' ', drivers.lastName) AS driverName,
            cars.registrationNumber,
            cars.carType
        FROM bookings
        LEFT JOIN customers ON bookings.customer_id = customers.id
        LEFT JOIN drivers ON bookings.driver_id = drivers.id
        LEFT JOIN cars ON bookings.car_id = cars.id
        ${whereConditions
            ? `WHERE ${whereConditions}`
            : ''}
        ORDER BY bookings.createdAt DESC
        LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)};`;
                
        const [rows] = await db.query(updatedSql, params);
        const [totalRows] = await db.query('SELECT FOUND_ROWS() AS count;');
        const total = totalRows[0].count;
        res.json({dutySlips: rows, total});
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({error: 'An error occurred while getting the dutySlips', err: error});
    }
});


router.post("/bookings/:id", async(req, res) => {
    const {id} = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM bookings WHERE id = ?', [id]);
        res.json({dutySlip: rows[0]});
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({error: 'An error occurred while getting the dutySlip'});
    }
});

router.post("/createBooking", upload.fields([
    {
        name: 'dutySlipsUpload',
        maxCount: 1
    }, {
        name: 'tollUpload',
        maxCount: 10
    }
]), async(req, res) => {
    const newBooking = req.body;
    try {
        if (req.files['dutySlipsUpload']) {
            const dutySlipsUploadFileName = req.files['dutySlipsUpload'][0].filename;
            newBooking.dutySlipsUpload = dutySlipsUploadFileName;
        }

        console.log('req', req.files['tollUpload'])
        if (req.files['tollUpload']) {
            const tollUploadFileNames = req
                .files['tollUpload']
                .map(file => file.filename);
            newBooking.tollUpload = tollUploadFileNames.join(','); // store filenames as a comma-separated string
        }

        const result = await db.query('INSERT INTO bookings SET ?', [newBooking]);
        res.json({
            data: {
                ...newBooking,
                id: result.insertId
            }
        });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({error: 'An error occurred while creating the dutySlip', err: error});
    }
});

router.post("/updateBooking",upload.fields([
    {
        name: 'dutySlipsUpload',
        maxCount: 1
    }, {
        name: 'tollUpload',
        maxCount: 10
    }
]),
verifyToken, [], async(req, res) => {
    const updatedBooking = req.body;
    const {id, tollUpload} = updatedBooking;
    if (req.files['dutySlipsUpload']) {
        const dutySlipsUploadFileName = req.files['dutySlipsUpload'][0].filename;
        updatedBooking.dutySlipsUpload = dutySlipsUploadFileName;
    }

    if (req.files['tollUpload']) {
        const tollUploadFileNames = req
            .files['tollUpload']
            .map(file => file.filename);
            updatedBooking.tollUpload = tollUploadFileNames.join(','); // store filenames as a comma-separated string
    }
    if(tollUpload) {
        const Combine = updatedBooking?.tollUpload?.concat(", ")?.concat(tollUpload?.toString())
        updatedBooking.tollUpload = Combine;
    }
    delete updatedBooking.id;
    try {
        await db.query('UPDATE bookings SET ? WHERE id = ?', [updatedBooking, id]);
        res.json({data: updatedBooking});
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({error: 'An error occurred while updating the dutySlip', err: error});
    }
});

// cancel booking : set status to cancel in bookings table based on ID
router.post("/cancelDutySlip", async(req, res) => {
    const {id} = req.body;
    try {
        await db.query('UPDATE bookings SET status = "cancel" WHERE id = ?', [id]);
        res.json({data: {
                id
            }});
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({error: 'An error occurred while cancelling the dutySlip', err: error});
    }
});

// fetch customers, drivers, cars for dropdowns
router.get("/getDropDowns", async(req, res) => {
    try {
        const [customersResult] = await db.query('SELECT id, firstName, lastName, isCompany, companyName FROM customers;');
        const [drivers] = await db.query('SELECT id, firstName, lastName FROM drivers;');
        const [cars] = await db.query('SELECT id, registrationNumber, carType FROM cars;');
        const companies = customersResult.filter(({isCompany}) => isCompany).map(({id, companyName}) => ({value: id, label: `${companyName} [Company]`}));
        const customers = customersResult.filter(({isCompany}) => !isCompany).map(({id, firstName, lastName}) => ({value: id, label: `${firstName} ${lastName}`}));

        const customersDropdown = [
            ...companies,
            ...customers
        ];
        const driversDropdown = drivers.map(({id, firstName, lastName}) => ({value: id, label: `${firstName} ${lastName}`}));
        const carsDropdown = cars.map(({id, registrationNumber, carType}) => ({value: id, label: `${registrationNumber} [${carType}]`}));

        res.json({customers: customersDropdown, drivers: driversDropdown, cars: carsDropdown});
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({error: 'An error occurred while getting the dropdowns', err: error});
    }
});

module.exports = router;