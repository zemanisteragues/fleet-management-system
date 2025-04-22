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

// POST API for a new customer
router.post(
	"/customers",
	verifyToken,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				message: "Validation failed",
				errors: errors.array()
			});
		}

		try {
			const {
				isCompany,
				firstName,
				lastName,
				companyName,
				email,
				phone,
				address,
				city,
				state,
				country,
				remarks,
				gstNumber
			} = req.body;

			const sql = `
          INSERT INTO customers (isCompany, firstName, lastName, companyName, phone, address, city, state, country, email, remarks, gstNumber)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

			const checkEmailQuery = 'SELECT * FROM customers WHERE email = ? AND email is not NULL';
			const checkPhoneQuery = 'SELECT * FROM customers WHERE phone = ?';
			// Replace 'gstNumber' with your actual gst number column name
			const checkGstNumberQuery = 'SELECT * FROM customers WHERE gstNumber = ?';
			let gstNumberExists = [];

			if (isCompany && gstNumber !== '') {
				[gstNumberExists] = await db.query(checkGstNumberQuery, [gstNumber]);
				// const [emailExists] = await db.query(checkEmailQuery, [email]);
				// const [phoneExists] = await db.query(checkPhoneQuery, [phone]);
				// if (emailExists.length > 0) {
				// 	return res.status(400).json({
				// 		message: 'The provided email already exists',
				// 	});
				// }

				// if (phoneExists.length > 0) {
				// 	return res.status(400).json({
				// 		message: 'The provided phone number already exists',
				// 	});
				// }

				if (gstNumberExists.length > 0 && isCompany) {
					return res.status(400).json({
						message: 'The provided GST number already exists',
					});
				}
			}



			const result = await db.query(sql, [
				isCompany,
				firstName,
				lastName,
				companyName,
				phone,
				address,
				city,
				state,
				country,
				email,
				remarks,
				gstNumber
			]);

			res.status(201).json({
				msg: 'User created successfully'
			});
		} catch (err) {
			console.error(err);
			res.status(500).send("Error creating customer");
		}
	}
);

// GET API to get a customer by name for autocomplete
router.post("/customersQuery", verifyToken, async (req, res) => {

	try {
		const {
			query
		} = req.body;

		const sqlCustomers = `SELECT * FROM customers WHERE isCompany = 0 AND isActive = 1 AND (firstName LIKE ? OR lastName LIKE ?) ORDER BY firstName, lastName, id LIMIT 50`;
		const [customersResult] = await db.query(sqlCustomers, [`%${query}%`, `%${query}%`]);
		const customers = customersResult.map(({ id, firstName, lastName }) => ({ id, label: `${firstName} ${lastName} [Individual]` }));

		const sqlCompanies = `SELECT * FROM customers WHERE isCompany = 1 AND isActive = 1 AND companyName LIKE ? ORDER BY companyName, id LIMIT 50`;
		const [companiesResult] = await db.query(sqlCompanies, [`%${query}%`]);
		const companies = companiesResult.map(({ id, companyName }) => ({ id, label: `${companyName} [Company]` }));

		const results = [...customers, ...companies];
		// array of json objects for 
		res.status(200).json(results);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error getting customers");
	}
});

// GET API to list all companies
router.get("/companies", verifyToken, async (req, res) => {
	try {
		const sql = `SELECT * FROM customers WHERE isCompany = 1 ORDER BY isActive DESC, companyName`;
		const [companies] = await db.query(sql);
		res.status(200).json(companies);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error getting companies");
	}
});

// GET API to list all individual customers
router.get("/individuals", verifyToken, async (req, res) => {
	try {
		const sql = `SELECT * FROM customers WHERE isCompany = 0 ORDER BY isActive DESC, firstName, lastName, id`;
		const [individuals] = await db.query(sql);
		res.status(200).json(individuals);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error getting individuals");
	}
});

// GET API for all customers based on pageIndex, pageSize, sort, query, filterData
router.post("/searchCustomer", verifyToken, async (req, res) => {
	try {
		const {
			pageIndex,
			pageSize,
			sort,
			query,
			customerType,
			customerStatus,
		} = req.body;

		// sql query to get all customers order by isActive and alphabetically by firstName and then lastName and their isCompany status
		let customerTypeCondition = `isCompany = '${customerType}'`;
		if (customerType === 'all') {
			customerTypeCondition = "(isCompany = '1' OR isCompany = '0')";
		}

		let customerStatusCondition = `isActive = ${customerStatus}`;
		if (customerStatus === 'all') {
			customerStatusCondition = "(isActive = 0 OR isActive = 1)";
		}

		const updatedSQL = `
            SELECT SQL_CALC_FOUND_ROWS *
            FROM customers
            WHERE 
                (${customerTypeCondition}) AND
                (${customerStatusCondition}) AND
                (firstName LIKE '%${query}%' OR lastName LIKE '%${query}%' OR companyName LIKE '%${query}%')
			ORDER BY isActive DESC
            LIMIT ${parseInt(pageSize)} OFFSET ${(parseInt(pageIndex) - 1) * parseInt(pageSize)};
        `;

		const results = await db.query(updatedSQL);

		// We got the results, now let's get the count
		const countResults = await db.query('SELECT FOUND_ROWS() as count;');
		const numOfRows = countResults[0][0].count;
		res.status(200).json({
			data: results[0],
			count: numOfRows
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ 'msg': "Error retrieving customers" });
	}
});

// GET API for all customers
router.get("/customers", verifyToken, async (req, res) => {
	try {
		// sql query to get all customers order by isActive and alphabetically by firstName and then lastName
		const sql = `SELECT * FROM customers ORDER BY isActive DESC, firstName, lastName LIMIT 50`;
		// const sql = `SELECT * FROM customers ORDER BY isActive DESC`;
		const customers = await db.query(sql);
		res.status(200).json(customers[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error retrieving customers");
	}
});

// GET API for a single customer
router.get("/customers/:id", verifyToken, async (req, res) => {
	try {
		const {
			id
		} = req.params;
		const sql = `
      SELECT * FROM customers WHERE id = ?
    `;
		const customers = await db.query(sql, [id]);
		res.status(200).json(customers[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error retrieving customer");
	}
});

// PUT API for a new customer
router.put(
	"/customers",
	verifyToken,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				errors: errors.array()
			});
		}

		try {
			const {
				isCompany,
				firstName,
				lastName,
				companyName,
				phone,
				address,
				city,
				state,
				country,
				email,
				remarks,
				gstNumber
			} = req.body;
			const customerId = parseInt(req.body.customerId);

			const checkEmailQuery = 'SELECT * FROM customers WHERE email = ? AND email is not null AND id != ?';
			const checkPhoneQuery = 'SELECT * FROM customers WHERE phone = ? AND phone is not null AND id != ?';
			const checkGstNumberQuery = 'SELECT * FROM customers WHERE gstNumber = ? AND gstNumber is not null AND id != ?';

			const [emailExists] = await db.query(checkEmailQuery, [email, customerId]);
			const [phoneExists] = await db.query(checkPhoneQuery, [phone, customerId]);
			const [gstNumberExists] = await db.query(checkGstNumberQuery, [gstNumber, customerId]);

			if (emailExists.length > 0) {
				return res.status(400).json({
					message: 'The provided email already exists',
				});
			}

			if (phoneExists.length > 0) {
				return res.status(400).json({
					message: 'The provided phone number already exists',
				});
			}

			if (gstNumberExists.length > 0) {
				return res.status(400).json({
					message: 'The provided GST number already exists',
				});
			}

			const sql = `
              UPDATE customers
              SET isCompany = COALESCE(?, isCompany),
                  firstName = COALESCE(?, firstName),
                  lastName = COALESCE(?, lastName),
                  companyName = COALESCE(?, companyName),
                  phone = COALESCE(?, phone),
                  address = COALESCE(?, address),
                  city = COALESCE(?, city),
                  state = COALESCE(?, state),
                  country = COALESCE(?, country),
				  email = COALESCE(?, email),
				  remarks = COALESCE(?, remarks),
				  gstNumber = COALESCE(?, gstNumber)
              WHERE id = ?
            `;

			const result = await db.query(sql, [
				isCompany,
				firstName,
				lastName,
				companyName,
				phone,
				address,
				city,
				state,
				country,
				email,
				remarks,
				gstNumber,
				customerId,
			]);

			if (result.affectedRows === 0) {
				return res.status(404).send("Customer not found");
			}

			res.status(200).send("Customer updated successfully");
		} catch (err) {
			console.error(err);
			res.status(500).send("Error updating customer");
		}
	}
);

// DELETE API for a single customer
router.delete("/customers/", verifyToken, async (req, res) => {
	try {
		const {
			id
		} = req.body;
		const sql = `
      Update customers set isActive = 0 WHERE id = ?
    `;
		const result = await db.query(sql, [id]);
		if (result.affectedRows === 0) {
			return res.status(404).send("Customer not found");
		}
		res.status(200).send("Customer deleted successfully");
	} catch (err) {
		console.error(err);
		res.status(500).send("Error deleting customer");
	}
});

// DELETE API for a single customer
router.put("/restoreCustomer/", verifyToken, async (req, res) => {
	try {
		const {
			id
		} = req.body;
		const sql = `Update customers set isActive = 1 WHERE id = ?`;
		const result = await db.query(sql, [id]);
		if (result.affectedRows === 0) {
			return res.status(404).send("Customer not found");
		}
		res.status(200).send({ message: "Customer updated successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).send("Error restoring customer");
	}
});

module.exports = router;