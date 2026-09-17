const Bill = require("../models/Bill");

// Dashboard summary
const getDashboard = async (req, res) => {
  try {
    const totalRides = await Bill.countDocuments();

    const result = await Bill.aggregate([
      {
        $group: {
          _id: null,
          totalBillAmount: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalBillAmount =
      result.length > 0 ? result[0].totalBillAmount : 0;

    res.json({
      success: true,
      data: {
        totalRides,
        totalBillAmount,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
    });
  }
};

// Get all bills
const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bills.length,
      bills,
    });
  } catch (error) {
    console.error("Get bills error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load bills.",
    });
  }
};

// Get single bill
const getSingleBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found.",
      });
    }

    res.json({
      success: true,
      bill,
    });
  } catch (error) {
    console.error("Get single bill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load bill.",
    });
  }
};

module.exports = {
  getDashboard,
  getAllBills,
  getSingleBill,
};