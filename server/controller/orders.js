const asyncHandler = require("express-async-handler");
const Order = require("../model/productSchema");
const { default: mongoose } = require("mongoose");

const getOrders = asyncHandler(async (req, res) => {
  const excludeFields = ["sort", "page", "limit", "fields"];
  const queryObj = { ...req.query };

  excludeFields.forEach((el) => {
    delete queryObj[el];
  });

  let queryStr = JSON.stringify(queryObj);
  // FOR FILTERS
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let queryFind = Order.find(JSON.parse(queryStr)); // fetch data from db

  // FOR SORTING
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" "); // usage : query.sort(price date ) -> space saperated
    queryFind = queryFind.sort(sortBy);
  } else {
    queryFind = queryFind.sort(`-createdAt -last_update_time`);
  }

  // FOR LIMITING FIELDS
  if (req.query.fields) {
    const fields = req.query.fields
      .split(",")
      .map((each) => `-${each}`) // `-` specifies excluding
      .join(" "); // converting to space saperated
    queryFind = queryFind.select(fields);
  } else {
    queryFind = queryFind.select(`-__v`);
  }

  // FOR PAGINATION
  if (req.query.page || req.query.limit) {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skipCount = (page - 1) * limit;
    queryFind = queryFind.skip(skipCount).limit(limit);

    const ordersCount = await Order.countDocuments(JSON.parse(queryStr));
    if (skipCount >= ordersCount) {
      res.status(404)
      throw new Error("This page is not found!");
    }
  }

  const orders = await queryFind;
  res.status(200).json({ total: orders.length, orders });
});

const postOrders = asyncHandler(async (req, res) => {
  const ordersList = [];
  for (let i = 0; i < req.body.length; i++) {
    const { item_type, order_state, last_update_time, branch, customer } =
      req.body[i];
    if (
      !item_type ||
      !order_state ||
      !last_update_time ||
      !branch ||
      !customer
    ) {
      res.status(400);
      throw new Error("Please input all fields".bgRed);
    }
    const order = await Order.create({
      item_type,
      order_state,
      last_update_time,
      branch,
      customer,
    });
    ordersList.push(order);
  }

  res.status(200).json(ordersList);
});

const getSpecificOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });

  res.status(200).json(order);
});

module.exports = {
  getOrders,
  postOrders,
  getSpecificOrder,
};
