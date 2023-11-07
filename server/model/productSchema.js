const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    item_type: {
      type: String,
      enum: ["Cake", "Cookies", "Muffins"],
      required: true,
    },
    order_state: {
      type: String,
      enum: ["Created", "Shipped", "Delivered", "Canceled"],
      required: true,
    },
    last_update_time: {
      type: Date,
      default: Date.now,
    },
    branch: {
      type: Number,
      required: true,
      min: 1,
      max: 1000,
    },
    customer: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
