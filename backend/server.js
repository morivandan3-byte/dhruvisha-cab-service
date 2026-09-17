const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const billRoutes = require("./routes/billRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/bills", billRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); 

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Dhruvisha Cab Service API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 