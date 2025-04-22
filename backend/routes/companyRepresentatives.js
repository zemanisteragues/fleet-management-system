const express = require("express");
const router = express.Router();
const db = require("../db");
const {
	body,
	validationResult
} = require("express-validator");
require('dotenv').config();
const verifyToken = require("../middleware/verifyToken");

// POST API for a new company representative

module.exports = router;