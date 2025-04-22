const express = require("express");
const router = express.Router();
const db = require("../db");
const {
    body,
    validationResult
} = require("express-validator");
require('dotenv').config();
const verifyToken = require("../middleware/verifyToken");

router.post("/cars", verifyToken, async (req, res) => {
    try {
        const { currentPage, pageSize, query, carStatus } = req.body;
        const offset = (currentPage - 1) * pageSize;
        
        let statusCondition = '';
        if (carStatus !== 'all') {
            statusCondition = 'AND isActive = ?';
        }

        const sql = `
            SELECT SQL_CALC_FOUND_ROWS * FROM cars
            WHERE (registrationNumber LIKE ? OR carType LIKE ?)
            ${statusCondition}
            ORDER BY isActive DESC
            LIMIT ? OFFSET ?
        `;
        const countSql = `SELECT FOUND_ROWS() as totalCount`;

        const params = [`%${query}%`, `%${query}%`, pageSize, offset];
        if (carStatus !== 'all') {
            params.splice(2, 0, carStatus);
        }

        const [cars] = await db.query(sql, params);
        const [rows] = await db.query(countSql);
        const totalCount = rows[0].totalCount;

        res.json({
            cars,
            totalCount
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Validation and sanitization for POST request
const postValidationRules = [
    body('registrationNumber').notEmpty().isString(),
    body('carType').notEmpty().isString()
];

const postSanitize = [
    body('registrationNumber').trim().escape(),
    body('carType').trim().escape()
];

// POST API to add a new car
router.post("/addCar", verifyToken, postValidationRules, postSanitize, async (req, res) => {
    try {
        // Check if there are validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid request data'
            });
        }

        const {registrationNumber, carType} = req.body;

        // Check if car already exists
        const [cars] = await db.query('SELECT * FROM cars WHERE registrationNumber = ?', [registrationNumber]);
        if (cars.length > 0) {
            return res.status(400).json({
                message: "Car already exists"
            });
        }

        // Insert new car
        const [result] = await db.query('INSERT INTO cars (registrationNumber, carType) VALUES (?, ?)', [registrationNumber, carType]);
        res.json({
            message: "Car added successfully",
            carId: result.insertId
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Validation and sanitization for PUT request
const putValidationRules = [
    body('registrationNumber').optional().notEmpty().isString(),
    body('isActive').optional().notEmpty().isBoolean(),
    body('carType').optional().notEmpty().isString()
  ];
  
  const putSanitize = [
    body('registrationNumber').trim().escape(),
    body('isActive').toBoolean(),
    body('carType').trim().escape()
  ];

// PUT API to update an existing car
router.put("/cars/", verifyToken, putValidationRules, putSanitize, async (req, res) => {
    try {
        const {registrationNumber, carType, id} = req.body;

        // Check if car exists
        const [cars] = await db.query('SELECT * FROM cars WHERE id = ?', [id]);
        if (cars.length === 0) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        // Check if car already exists
        const [cars2] = await db.query('SELECT * FROM cars WHERE registrationNumber = ?', [registrationNumber]);
        if (cars2.length > 0 && cars2[0].id !== id) {
            return res.status(400).json({
                message: "Car already exists"
            });
        }

        // Update car details
        const [result] = await db.query('UPDATE cars SET registrationNumber = ?, carType = ? WHERE id = ?', [registrationNumber, carType, id]);
        res.json({
            message: "Car updated successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// DELETE API to delete an existing car
router.delete("/cars/", verifyToken, async (req, res) => {
    try {
        const id = req.body.id;
        console.log('this is called ' + id);
        // Check if car exists
        const [cars] = await db.query('SELECT * FROM cars WHERE id = ?', [id]);
        if (cars.length === 0) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        // Delete car
        const [result] = await db.query('UPDATE cars SET isActive = 0 WHERE id = ?', [id]);
        res.json({
            message: "Car deleted successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// API to get cars based on query
router.post("/carsQuery", verifyToken, async (req, res) => {
    try {
        // Get all cars
        const {
			query
		} = req.body; 
	
        // SQL query to fetch cars based on query 
        const sqlCars = `SELECT * FROM cars WHERE isActive = 1 AND registrationNumber LIKE ? OR carType LIKE ? ORDER BY registrationNumber, carType, id LIMIT 50`;
        const [carsResult] = await db.query(sqlCars, [`%${query}%`, `%${query}%`]);
		const cars = carsResult.map(({ id, registrationNumber, carType }) => ({ id, label: `${registrationNumber} | ${carType}` }));
		
        res.json(cars);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;