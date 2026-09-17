const Bill = require("../models/Bill");
const Counter = require("../models/Counter");

const VEHICLE_NUMBER = "GJ05CY7195";

const vehicles = {
  "Swift Dzire": {
    driver: "Bhavesh Jadav",
    driverMobile: "+91 97124 97925",
  },

  Xcent: {
    driver: "Darshan Jadav",
    driverMobile: "+91 8140675891",
  },
};

const createBill = async (req, res) => {
  try {
    const {
      customerName,
      mobile,
      pickup,
      drop,
      vehicle,
      totalAmount,
    } = req.body;

    // Check required fields
    if (
      !customerName ||
      !mobile ||
      !pickup ||
      !drop ||
      !vehicle ||
      !totalAmount
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required details.",
      });
    }

    // Check vehicle
    const selectedVehicle = vehicles[vehicle];

    if (!selectedVehicle) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle selected.",
      });
    }

    // Generate next bill number
    const counter = await Counter.findOneAndUpdate(
      { _id: "billNumber" },
      { $inc: { seq: 1 } },
      {
        new: true,
        upsert: true,
      },
    );

    const billNumber = `DCS-${String(counter.seq).padStart(2, "0")}`;

    // Create bill
    const bill = await Bill.create({
      billNumber,
      customerName,
      mobile,
      pickup,
      drop,
      vehicle,
      driver: selectedVehicle.driver,
      driverMobile: selectedVehicle.driverMobile,
      vehicleNumber: VEHICLE_NUMBER,
      totalAmount: Number(totalAmount),
      billDate: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Bill created successfully.",
      bill,
    });
  } catch (error) {
    console.error("Create bill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create bill.",
      error: error.message,
    });
  }
};

module.exports = {
  createBill,
};