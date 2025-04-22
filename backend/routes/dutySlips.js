const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const moment = require('moment');

const db = require("../db");

const dutySlipValidation = [
  body('carId').isInt().withMessage('Car ID must be an integer'),
  body('driverId').isInt().withMessage('Driver ID must be an integer'),
  body('customerId').isInt().withMessage('Customer ID must be an integer'),
  body('passengerName').isString().withMessage('Passenger name must be a string'),
  body('passengerPhone').isString().withMessage('Passenger phone must be a string'),
  body('extraTime').optional().isString().withMessage('Extra time must be a string'),
  body('imageUrl').optional().isString().withMessage('Image URL must be a string'),
  body('trips').isArray().withMessage('Trips must be an array'),
  body('trips.*.start_date').isISO8601().withMessage('Start date must be in ISO 8601 format'),
  body('trips.*.release_date').isISO8601().withMessage('Release date must be in ISO 8601 format'),
  body('trips.*.startingKm').isInt().withMessage('Starting KM must be an integer'),
  body('trips.*.closingKm').isInt().withMessage('Closing KM must be an integer'),
  body('trips.*.pickupLocation').isString().withMessage('Pickup location must be a string'),
  body('trips.*.dropLocation').isString().withMessage('Drop location must be a string'),
];

router.post('/duty_slips', dutySlipValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { carId, driverId, customerId, passengerName, passengerPhone, extraTime, imageUrl, trips } = req.body;
    // Insert duty slip
    const dutySlipSql = 'INSERT INTO duty_slips (carId, driverId, customerId, passengerName, passengerPhone, extraTime, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const dutySlipResult = await db.query(dutySlipSql, [carId, driverId, customerId, passengerName, passengerPhone, extraTime, imageUrl]);

    const dutySlipId = dutySlipResult[0].insertId;

    // Insert trips
    const tripSql = 'INSERT INTO trip_details (dutySlipId, start_date, release_date, startingKm, closingKm, totalKM, pickupLocation, dropLocation ) VALUES ?';
    const tripValues = trips.map(trip => {
      const totalKM = trip.closingKm - trip.startingKm;
      const start_date = moment(trip.start_date).format('YYYY-MM-DD HH:mm:ss');
      const release_date = moment(trip.release_date).format('YYYY-MM-DD HH:mm:ss');
      return [dutySlipId, start_date, release_date, trip.startingKm, trip.closingKm, totalKM, trip.pickupLocation, trip.dropLocation];
    });
    await db.query(tripSql, [tripValues]);

    res.status(201).json({ dutySlipId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the duty slip and trips' });
  }
});

//Get all duty slips
router.get('/duty_slips', async (req, res) => {
  try {
    const query = 'SELECT duty_slips.id AS duty_slip_id, duty_slips.createdAt, duty_slips.isActive, duty_slips.passengerName, duty_slips.passengerPhone, duty_slips.extraTime, duty_slips.imageUrl, customers.id AS customer_id, customers.firstName AS customer_first_name, customers.lastName AS customer_last_name, companyName, isCompany, cars.id AS car_id, cars.registrationNumber, cars.carType, drivers.id AS driver_id, drivers.firstName AS driver_first_name, drivers.lastName AS driver_last_name FROM duty_slips JOIN customers ON duty_slips.customerId = customers.id JOIN cars ON duty_slips.carId = cars.id JOIN drivers ON duty_slips.driverId = drivers.id ORDER BY duty_slips.createdAt DESC LIMIT 50';
    
    const dutySlips = await db.query(query);
    res.status(200).json(dutySlips[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the duty slips' });
  }
});

// Get all duty slips based on customer id
// router.post('/duty_slips/customer/', async (req, res) => {
//   try {
//     const { customerId } = req.body;
//     const query = 'SELECT bookings.id AS bookings_id,bookings.createdAt, bookings.bookedByPassengerName, bookings.bookedByPassengerPhone, customers.id AS customer_id, customers.firstName AS customer_first_name, customers.lastName AS customer_last_name, cars.id AS car_id, cars.registrationNumber, cars.carType, drivers.id AS driver_id, drivers.firstName AS driver_first_name, drivers.lastName AS driver_last_name FROM bookings JOIN customers ON bookings.customer_id = customers.id JOIN cars ON bookings.car_id = cars.id JOIN drivers ON bookings.driver_id = drivers.id WHERE customers.id = ?   ORDER BY bookings.createdAt ASC LIMIT 50';

//     const dutySlips = await db.query(query, [customerId]);
//     const result = dutySlips[0].map(({ bookings_id, bookedByPassengerName, driver_first_name, driver_last_name, registrationNumber, createdAt}) => ({ id: bookings_id, passengerName: bookedByPassengerName, driverName: `${driver_first_name} ${driver_last_name}`, registrationNumber, createdAt: moment(createdAt).format('DD-MM-YYYY') }));
		
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while getting the duty slips' });
//   }
// });
// Get all duty slips based on customer id
router.post('/duty_slips/customer/', async (req, res) => {
  try {
    const { customerId } = req.body;
    const query = `
      SELECT bookings.id AS bookings_id, bookings.createdAt, bookings.bookedByPassengerName, bookings.bookedByPassengerPhone,
        customers.id AS customer_id, customers.firstName AS customer_first_name, customers.lastName AS customer_last_name,
        cars.id AS car_id, cars.registrationNumber, cars.carType,
        drivers.id AS driver_id, drivers.firstName AS driver_first_name, drivers.lastName AS driver_last_name,
        bookings.invoice_id, bookings.dutyStartDateAndTime, bookings.dutyEndDateAndTime, bookings.ignoreLastDay,
        bookings.dutyType, bookings.basePrice, bookings.perExtraKmPrice, bookings.perExtraHrPrice,
        bookings.dutyStartKm, bookings.dutyEndKm, bookings.tollTax, bookings.tollUpload,
        bookings.dutySlipsUpload, bookings.startFrom, bookings.endTo, bookings.status, bookings.subTotal
      FROM bookings
      JOIN customers ON bookings.customer_id = customers.id
      JOIN cars ON bookings.car_id = cars.id
      JOIN drivers ON bookings.driver_id = drivers.id
      WHERE customers.id = ? AND bookings.invoice_id IS NULL
      ORDER BY bookings.createdAt ASC
      LIMIT 50`;

    const dutySlips = await db.query(query, [customerId]);
    const result = dutySlips[0].map(({ bookings_id, createdAt, bookedByPassengerName, bookedByPassengerPhone, customer_id, customer_first_name, customer_last_name, car_id, registrationNumber, carType, driver_id, driver_first_name, driver_last_name, invoice_id, dutyStartDateAndTime, dutyEndDateAndTime, ignoreLastDay, dutyType, basePrice, perExtraKmPrice, perExtraHrPrice, dutyStartKm, dutyEndKm, tollTax, tollUpload, dutySlipsUpload, startFrom, endTo, status, subTotal }) => ({
      id: bookings_id,
      createdAt,
      bookedByPassengerName,
      bookedByPassengerPhone,
      customer_id,
      customer_first_name,
      customer_last_name,
      car_id,
      registrationNumber,
      carType,
      driver_id,
      driver_first_name,
      driver_last_name,
      invoice_id,
      dutyStartDateAndTime,
      dutyEndDateAndTime,
      ignoreLastDay,
      dutyType,
      basePrice,
      perExtraKmPrice,
      perExtraHrPrice,
      dutyStartKm,
      dutyEndKm,
      tollTax,
      tollUpload,
      dutySlipsUpload,
      startFrom,
      endTo,
      status,
      driverName: `${driver_first_name} ${driver_last_name}`, // Add driverName field
      createdAt: moment(createdAt).format('DD-MM-YYYY'), // Format createdAt field
      subTotal
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the duty slips' });
  }
});

// Delete the duty slips
router.delete('/duty_slips/', async (req, res) => {
  try {
    const dutySlipId  = req.body.id;
    const result = db.query('UPDATE duty_slips SET isActive = 0 WHERE id =?', dutySlipId);
    res.status(200).json({ message: "Deleted the duty slip successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the duty slip' });
  }
});

// Get duty slip by id
router.post('/duty_slips/id', async (req, res) => {
  try {
    const { id } = req.body.id;
    console.log('id', id);
    // query to fetch duty slips along with trips and customer details and driver details and car details
    const sql = 'SELECT duty_slips.id AS duty_slip_id, duty_slips.createdAt, duty_slips.isActive, duty_slips.passengerName, duty_slips.passengerPhone, duty_slips.extraTime, duty_slips.imageUrl, customers.id AS customer_id, customers.firstName AS customer_first_name, customers.lastName AS customer_last_name, companyName, isCompany, cars.id AS car_id, cars.registrationNumber, cars.carType, drivers.id AS driver_id, drivers.firstName AS driver_first_name, drivers.lastName AS driver_last_name FROM duty_slips JOIN customers ON duty_slips.customerId = customers.id JOIN cars ON duty_slips.carId = cars.id JOIN drivers ON duty_slips.driverId = drivers.id WHERE duty_slips.id = ?';

    const dutySlips = await db.query(sql, [id]);

    // fetch all trips for the duty slip
    const tripSql = 'SELECT * FROM trip_details WHERE dutySlipId = ?';
    const trips = await db.query(tripSql, [id]);

    // merge trips and duty slips data
    dutySlips[0][0].trips = trips[0];

    res.status(200).json(dutySlips[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the duty slips' });
  }
});

module.exports = router;
