const ReqInventory = require("../models/reqInventoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
//create req inventory

exports.createReqInventory = catchAsyncErrors(async (req, res, next) => {
  const { orderItems } = req.body;
  const reqInventory = await ReqInventory.create({
    orderItems,
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    reqInventory,
  });
});

// get Single Order
exports.getSingleRequest = catchAsyncErrors(async (req, res, next) => {
  const request = await ReqInventory.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!request) {
    return next(new ErrorHander("Request not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    request,
  });
});

// get logged in user  Requests
exports.myRequests = catchAsyncErrors(async (req, res, next) => {
  const request = await ReqInventory.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    request,
  });
});

// get all Request-- Admin
exports.getAllRequest = catchAsyncErrors(async (req, res, next) => {
  const request = await ReqInventory.find();

  res.status(200).json({
    success: true,
    request,
  });
});

// update Request Status -- Admin
exports.updateRequest = catchAsyncErrors(async (req, res, next) => {
  const request = await ReqInventory.findById(req.params.id);

  if (!request) {
    return next(new ErrorHander("Request not found with this Id", 404));
  }

  if (request.requestStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    request.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  request.requestStatus = req.body.status;

  if (req.body.status === "Delivered") {
    request.deliveredAt = Date.now();
  }

  await request.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    request,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Request -- Admin
exports.deleteRequest = catchAsyncErrors(async (req, res, next) => {
  const request = await Order.findById(req.params.id);

  if (!request) {
    return next(new ErrorHander("Request not found with this Id", 404));
  }

  await request.remove();

  res.status(200).json({
    success: true,
    message: "Request deleted",
  });
});
