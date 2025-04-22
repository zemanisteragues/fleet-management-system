const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const {
    body,
    validationResult
} = require("express-validator");
require('dotenv').config();
const verifyToken = require("../middleware/verifyToken");

// Secret key for JWT
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Generate JWT token for admin
const generateToken = (admin, rememberMe) => {
    const payload = {
        isAdmin: true,
        admin
    };
    if (rememberMe) {
        return jwt.sign(payload, jwtSecretKey, { expiresIn: '1y' });
    }
    return jwt.sign(payload, jwtSecretKey, { expiresIn: '24h' });
};

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};

// Login api for admin
router.post("/login", [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidationErrors
], async (req, res) => {
    const {
        username,
        password,
        rememberMe
    } = req.body;
    try {
        const [admin] = await db.query('SELECT * FROM admin WHERE username = ?', [username]);
        if (!admin || admin.length === 0) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, admin[0].password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }
        const token = generateToken(admin[0], rememberMe);

        const { id, email, firstname, lastname, avatar, role } = admin[0];

        res.json({
            message: "Login successful",
            user: { id, username, email, firstname, lastname, avatar, role },
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Create a new admin API
router.post("/register", [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Email must be a valid email"),
    body("password").isLength({
        min: 8
    }).withMessage("Password must be at least 8 characters long"),
    body("firstname").notEmpty().withMessage("Firstname is required"),
    body("lastname").notEmpty().withMessage("Lastname is required"),
    handleValidationErrors
], async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            firstname,
            lastname,
            role
        } = req.body;

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the user into MySQL
        const result = await db.query(
            "INSERT INTO admin (username, email, password, firstname, lastname, role) VALUES (?, ?, ?, ?, ?, ?)",
            [username, email, hashedPassword, firstname, lastname, role]
        );

        // Return the new admin user's ID
        res.json({
            message: "User created",
            id: result.insertId
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// PUT API to update admin details
router.put("/admins/:id", verifyToken, [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Email must be a valid email"),
    body("firstname").notEmpty().withMessage("Firstname is required"),
    body("lastname").notEmpty().withMessage("Lastname is required"),
    body("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),
    handleValidationErrors
], async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            username,
            email,
            firstname,
            lastname,
            avatar
        } = req.body;

        // update the admin details
        const result = await db.query(
            "UPDATE admin SET username = ?, email = ?, firstname = ?, lastname = ?, avatar = ? WHERE id = ?",
            [username, email, firstname, lastname, avatar, id]
        );

        // Check if the admin was not found
        if (result.affectedRows === 0) {
            return res.status(404).send('Admin not found');
        }

        // Return a success message
        res.json({
            message: "Admin updated successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Update password for each user
router.put("/password/:id", verifyToken, [
    body("password").isLength({
        min: 8
    }).withMessage("Password must be at least 8 characters long"),
    handleValidationErrors
], async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            password
        } = req.body;
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // update the admin details
        const result = await db.query(
            "UPDATE admin SET password = ? WHERE id = ?",
            [hashedPassword, id]
        );

        // Check if the admin was not found
        if (result.affectedRows === 0) {
            return res.status(404).send('Admin not found');
        }

        // Return a success message
        res.json({
            message: "Password updated successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// PUT API to update admin isActive status
router.put("/admins/:id/isActive", verifyToken, [
    body("isActive").isBoolean().withMessage("isActive must be a boolean"),
    handleValidationErrors
], async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            isActive
        } = req.body;

        // admin cannot update their own isActive status
        if (id === req.admin.id) {
            return res.status(403).send('Forbidden');
        }

        // at least one isActive admin is required
        const [admins] = await db.query('SELECT * FROM admin WHERE isActive = ?', [true]);
        if (admins.length === 1 && admins[0].id === id) {
            return res.status(403).send('Forbidden');
        }

        // update the admin details
        const result = await db.query(
            "UPDATE admin SET isActive = ? WHERE id = ?",
            [isActive, id]
        );

        // Check if the admin was not found
        if (result.affectedRows === 0) {
            return res.status(404).send('Admin not found');
        }
        // Return a success message
        res.json({
            message: "Admin updated successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// GET API to get all admins
router.get("/admins", verifyToken, async (req, res) => {
    try {
        // Get all admins
        const [admins] = await db.query('SELECT * FROM admin');
        res.json(admins);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// GET API to get logged in admin details
router.get("/admins/me", verifyToken, async (req, res) => {
    try {
        // Get logged in admin details
        const [admin] = await db.query('SELECT * FROM admin WHERE id = ?', [req.admin.id]);
        res.json(admin[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// GET API to get admin details by id
router.get("/admins/:id", verifyToken, async (req, res) => {
    try {
        const {
            id
        } = req.params;
        // Get admin details by id
        const [admin] = await db.query('SELECT * FROM admin WHERE id = ?', [id]);
        // Check if the admin was not found
        if (admin.length === 0) {
            return res.status(404).send('Admin not found');
        }
        res.json(admin[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// GET API to verify logged in user with jwt token
router.get('/check-token', (req, res) => {
    const token = req.headers.authorization; // extract token from authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecretKey); // replace with your own secret key
        return res.status(200).json({ message: 'Token is valid', decoded });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

// POST API to logout admin
router.post("/logout", verifyToken, async (req, res) => {
    try {
        // Delete the refresh token from the database
        // await db.query("DELETE FROM token WHERE token = ?", [req.body.refreshToken]);
        // expire the jwt token
        res.clearCookie("jwt");
        res.json({
            message: "Logged out successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// DELETE API to delete admin
router.delete("/delete-user",  async (req, res) => {
    try {
        const {
            id
        } = req.body;
        const [admins] = await db.query('SELECT * FROM admin WHERE id = ?', [id]);
        if (admins.length > 0) {
            // Delete the admin from the database
            const result = await db.query("DELETE FROM admin WHERE id = ?", [id]);
            return  res.json({
                message: "User deleted successfully"
            });
        } else {
            return res.status(404).send('User not found');
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

//API TO UPDATE ADMIN ROLE
router.put("/updateAdminRole", async (req, res) => {
    const {id, role} = req.body;
    try {
        const checkAdminQuery = 'SELECT * FROM admin WHERE id = ?';
        const [adminExists] = await db.query(checkAdminQuery, [id]);
        if (adminExists.length > 0) {
            const updateQuery = `UPDATE admin SET role = ? WHERE id = ?`;
            const updateResult = await db.query(updateQuery, [role, id]);
            return res.status(200).json({
                message: "User role updated successfully"
            });
        } else {
            return res.status(400).json({
                message: 'No admin found',
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Error updating admin role");
    }
});

module.exports = router;