const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    pickup: {
      type: String,
      required: true,
      trim: true,
    },

    drop: {
      type: String,
      required: true,
      trim: true,
    },

    vehicle: {
      type: String,
      required: true,
    },

    driver: {
      type: String,
      required: true,
    },

    driverMobile: {
      type: String,
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    billDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Bill", billSchema);