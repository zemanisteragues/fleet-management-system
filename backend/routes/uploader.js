const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const db = require("../db");
const {
  body,
  validationResult
} = require("express-validator");
require('dotenv').config();
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

router.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;

  const imageName = file.filename;
  const sql = "INSERT INTO duty_slip_images (name) VALUES (?)";
  db.query(sql, [imageName], (err, result) => {
    if (err) throw err;
    res.json({ message: "Image uploaded and saved to the database." });
  });
});

module.exports = router;  