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

// POST API to add a new driver
router.post(
    "/drivers",
    verifyToken,
    [
        body("firstName").notEmpty().trim().escape(),
        body("lastName").notEmpty().trim().escape(),
        body("phone").notEmpty().isMobilePhone().trim().escape(),
        body("address").notEmpty().trim().escape(),
        body("licenseNumber").notEmpty().trim().escape(),
        body("licenseExpiry").notEmpty().isDate().toDate(),
        //body("licensePhoto").notEmpty().trim().escape(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        try {
            const {
                firstName,
                lastName,
                phone,
                address,
                licenseNumber,
                licenseExpiry
            } = req.body;
            const licenseImage = req.body.licensePhoto;
            const newDriver = await db.query(
                "INSERT INTO drivers (firstName, lastName, phone, address, licenseNumber, licenseExpiry, licenseImage) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [firstName, lastName, phone, address, licenseNumber, licenseExpiry, licenseImage]
            );
            res.status(201).json({
                message: "Driver created successfully!"
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Server error"
            });
        }
    }
);

// GET API to get all drivers
router.get("/drivers", verifyToken, async (req, res) => {
    try {
        // Get all drivers
        const [drivers] = await db.query('SELECT * FROM drivers ORDER BY isActive DESC');
        res.json(drivers);
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// GET API to get all drivers
router.post("/driversOnDashboard", verifyToken, async (req, res) => {
    try {
        const { currentPage, pageSize, query, driverStatus } = req.body;
        const offset = (currentPage - 1) * pageSize;
        
        let statusCondition = '';
        if (driverStatus !== 'all') {
            statusCondition = 'AND isActive = ?';
        }

        const sql = `
            SELECT SQL_CALC_FOUND_ROWS * FROM drivers
            WHERE ( firstName LIKE ? OR lastName LIKE ? OR phone LIKE ? OR address LIKE ? OR licenseNumber LIKE ? )
            ${statusCondition}
            ORDER BY isActive DESC
            LIMIT ? OFFSET ?
        `;
        const countSql = `SELECT FOUND_ROWS() as totalCount`;

        const params = [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, pageSize, offset];
        if (driverStatus !== 'all') {
            params.splice(5, 0, driverStatus);
        }

        const [drivers] = await db.query(sql, params);
        const [rows] = await db.query(countSql);
        const totalCount = rows[0].totalCount;

        res.json({
            drivers,
            totalCount
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.post("/driversQuery", verifyToken, async (req, res) => {
    try {
        // Get all drivers
        const {
			query
		} = req.body; 

        if(query==='') {
            const sqlDrivers = `SELECT * FROM drivers WHERE isActive = 1 ORDER BY firstName, lastName, id LIMIT 50`;
            const [driversResult] = await db.query(sqlDrivers);
            const drivers = driversResult.map(({ id, firstName, lastName }) => ({ id, label: `${firstName} ${lastName}` }));

            res.json(drivers);
            return;
        }
	
        // SQL query to fetch drivers based on query 
        const sqlDrivers = `SELECT * FROM drivers WHERE isActive = 1 AND firstName LIKE ? OR lastName LIKE ? ORDER BY firstName, lastName, id LIMIT 50`;
        const [driversResult] = await db.query(sqlDrivers, [`%${query}%`, `%${query}%`]);
		const drivers = driversResult.map(({ id, firstName, lastName }) => ({ id, label: `${firstName} ${lastName}` }));
		
        res.json(drivers);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// GET API to get a driver by id
router.get("/drivers/:id", verifyToken, async (req, res) => {
    try {
        const [driver] = await db.query('SELECT * FROM drivers WHERE id = ?', [req.params.id]);
        if (driver.length === 0) {
            return res.status(404).json({
                message: "Driver not found"
            });
        }
        res.json(driver[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// PUT API to update a driver by id
router.put(
    "/drivers/",
    upload.single('licenseImage'),
    verifyToken,
    [
        body("firstName").notEmpty().trim().escape(),
        body("lastName").notEmpty().trim().escape(),
        body("phone").notEmpty().isMobilePhone().trim().escape(),
        body("address").notEmpty().trim().escape(),
        body("licenseNumber").notEmpty().trim().escape(),
        body("licenseExpiry").notEmpty().isDate().toDate(),
        body("id").notEmpty().trim().escape(),
        body("licenseImage").notEmpty().trim().escape(),
    ],
    async (req, res) => {
        try {
            const {
                id,
                firstName,
                lastName,
                phone,
                address,
                licenseNumber,
                licenseExpiry,
                licenseImage,
            } = req.body;
            const licenseImageName = licenseImage || req?.file?.filename;
            const [driver] = await db.query('SELECT * FROM drivers WHERE id = ?', [id]);
            if (driver.length === 0) {
                return res.status(404).json({
                    message: "Driver not found"
                });
            }
            const result = await db.query(
                "UPDATE drivers SET firstName = ?, lastName = ?, phone = ?, address = ?, licenseNumber = ?, licenseExpiry = ?, licenseImage = ? WHERE id = ?",
                [firstName, lastName, phone, address, licenseNumber, licenseExpiry, licenseImageName, id]
            );
            res.status(200).json({
                message: "Driver updated successfully!"
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Server error"
            });
        }
    }
);

// DELETE API to delete a driver by id
router.delete("/drivers/", verifyToken, async (req, res) => {
    try {
        const id = req.body.id;
        // const {id} = req.body;
        const [driver] = await db.query('SELECT * FROM drivers WHERE id = ?', [id]);
        if (driver.length === 0) {
            return res.status(404).json({
                message: "Driver not found"
            });
        }
        const result = await db.query('UPDATE drivers SET isActive = 0 WHERE id = ?', [id])
        res.status(200).json({
            message: "Driver deleted successfully!"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// API to add a driver with license image
router.post("/driversWithImage", upload.single('licenseImage'), verifyToken, [
    body("firstName").notEmpty().trim().escape(),
    body("lastName").notEmpty().trim().escape(),
    body("phone").notEmpty().isMobilePhone().trim().escape(),
    body("address").notEmpty().trim().escape(),
    body("licenseNumber").notEmpty().trim().escape(),
    body("licenseExpiry").notEmpty().isDate().toDate(),
    body("licenseImage").notEmpty().trim().escape(),
], async (req, res) => {
    try {
        const { firstName, lastName, phone, address, licenseNumber, licenseExpiry } = req.body;
        const licenseImageName = req.file.filename;

        const query = 'INSERT INTO drivers (firstName, lastName, phone, address, licenseNumber, licenseExpiry, licenseImage, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())';

        const result = await db.query(query, [firstName, lastName, phone, address, licenseNumber, licenseExpiry, licenseImageName]);
        res.status(201).json({ message: 'Driver added successfully', driverId: result.insertId });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
    
});

module.exports = router;