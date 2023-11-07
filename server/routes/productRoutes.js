const express = require("express");
const router = express.Router();
const { getOrders, postOrders, getSpecificOrder } = require("../controller/orders");

router.get(`/api/order`, getOrders);

router.post(`/api/order`, postOrders);

router.get(`/api/order/:id`, getSpecificOrder)

module.exports = router;
