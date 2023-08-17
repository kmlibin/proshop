import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc    Create new order
//@route   POST /api/orders
//@access  private
const createOrder = asyncHandler(async (req, res) => {
  
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (cartItems && cartItems.length === 0) {
    res.status(400).json({ msg: "no order items" });
  } else {
    //order model - we have to add it, which is why we mapped. it's
    //linked with id.
    const order = new Order({
      orderItems: cartItems.map((o) => ({
        ...o,
        product: o._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc    Get logged in users orders
//@route   GET /api/orders/myorders
//@access  private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//@desc    Get order by ID
//@route   GET /api/orders/:id
//@access  private
const getOrderById = asyncHandler(async (req, res) => {
  //find by id, and also populate the user's name and email (from the 'user' schema). also shows id
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ msg: "order not found" });
  }
});

//@desc    Update Order to paid
//@route   PUT /api/orders/:id/pay
//@access  private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    //coming from paypal after paid
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404).json({ msg: "order not found" });
  }
});

//@desc    Update Order to delivered
//@route   PUT /api/orders/:id/deliver
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
