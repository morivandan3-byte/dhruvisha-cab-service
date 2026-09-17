const express = require("express");

const { createBill } = require("../controllers/billController");

const router = express.Router();

// Create new bill
router.post("/", createBill);

module.exports = router;