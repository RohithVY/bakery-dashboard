const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const colors = require("colors");
const cors = require("cors");

connectDB();

const app = express();

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", require("./routes/productRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
