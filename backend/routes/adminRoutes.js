const express = require("express");

const {
  getDashboard,
  getAllBills,
  getSingleBill,
} = require("../controllers/adminController");

const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/dashboard", adminAuth, getDashboard);

router.get("/bills", adminAuth, getAllBills);

router.get("/bills/:id", adminAuth, getSingleBill);

module.exports = router;