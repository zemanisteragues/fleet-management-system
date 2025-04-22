const express = require("express");
const router = express.Router();
const db = require("../db");
const {
  body,
  validationResult
} = require("express-validator");
require('dotenv').config();
const verifyToken = require("../middleware/verifyToken");
const _ = require('lodash');

// create duty type
router.post("/createDutyType",  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed",
      errors: errors.array()
    });
  }

  const {
    dutyType,
    hours,
    days, 
    kms,
    status
  } = req.body;

  try {
    const checkDutyTypeQuery = 'SELECT * FROM dutyTypes WHERE dutyType = ?';
    [dutyTypeExists] = await db.query(checkDutyTypeQuery, [dutyType]);

    if (dutyTypeExists.length >0 ) {
      return res.json({
        message: 'The duty type already exists',
      });
    }else{
      const insertQuery = `INSERT INTO dutyTypes (dutyType, hours, days, kms, status  ) VALUES (?,?,?,?, ?)`;
      const insertResult = await db.query(insertQuery, [dutyType, hours, days, kms, status]);
      return res.status(201).json({
        message: "Duty type created successfully"
      });
    }

  }catch(e){
    res.status(500).send("Error creating duty type");
  }
});

// get all duty types
router.get("/getDutyTypes",verifyToken, async (req, res) => {
  try {
    const getDutyTypesQuery = 'SELECT * FROM dutyTypes';
    [dutyTypes] = await db.query(getDutyTypesQuery);
    return res.status(200).json({
      dutyTypes
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error getting duty types");
  }
});

//delete duty type
router.delete("/deleteDutyType", async (req, res) => {
  const {dutyType} = req.body;
  console.log(dutyType);
  try {

    const checkDutyTypeInDutySlipsQuery = 'SELECT * FROM dutyTypes WHERE dutyType = ?';
    const [dutyTypeExistsInDutySlips] = await db.query(checkDutyTypeInDutySlipsQuery, [dutyType]);
    if (dutyTypeExistsInDutySlips.length > 0) {
       const deleteQuery = `DELETE FROM dutyTypes WHERE dutyType = ?`;
      const deleteResult = await db.query(deleteQuery, [dutyType]);
      return res.status(200).json({
        message: "Duty type deleted successfully"
      });
    }else{
      return res.status(400).json({
        message: 'No duty type found',
      });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).send("Error deleting duty type");
  }
});

// update the status of duty type
router.put("/updateDutyTypeStatus", async (req, res) => {
  const {dutyType, status} = req.body;
  try {

    //if duty type is present in db then update the status
    const checkDutyTypeQuery = 'SELECT * FROM dutyTypes WHERE dutyType = ?';
    const [dutyTypeExists] = await db.query(checkDutyTypeQuery, [dutyType]);
    if (dutyTypeExists.length > 0) {
      const updateQuery = `UPDATE dutyTypes SET status = ? WHERE dutyType = ?`;
      const updateResult = await db.query(updateQuery, [status, dutyType]);
      return res.status(200).json({
        message: "Duty type status updated successfully"
      });
    }else{
      return res.status(400).json({
        message: 'No duty type found',
      });
    }
    
  } catch (e) {
    res.status(500).send("Error updating duty type status");
  }
});




module.exports = router;