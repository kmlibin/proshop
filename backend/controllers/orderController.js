import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc    Create new order
//@route   POST /api/orders
//@access  private
const createOrder = asyncHandler(async (req, res) => {
  res.send("create order");
});

//@desc    Get logged in users orders
//@route   GET /api/orders/myorders
//@access  private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send("get users orders");
});

//@desc    Get order by ID
//@route   GET /api/orders/:id
//@access  private/admin
const getOrderById = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ msg: "no order items" });
  } else {
    //order model - order items has a product category that isn't passed with the frontend. we have to add it, which is why we mapped. it's 
    //linked with id.
    const order = new Order({
      orderItems: orderItems.map((o) => ({
        ...o, product: o._id, _id: undefined
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
  }
});

//@desc    Update Order to paid
//@route   GET /api/orders/:id/pay
//@access  private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update to paid");
});

//@desc    Update Order to delivered
//@route   GET /api/orders/:id/deliver
//@access  private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update to delivered");
});

//@desc    get all orders
//@route   GET /api/orders
//@access  private/admin
const getAllOrders = asyncHandler(async (req, res) => {
  res.send("get orders");
});

export {
  getAllOrders,
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
};
