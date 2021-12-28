const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [8, "Stock cannot exceed 4 digits"],
    default: 1,
  },
  u_o_m: {
    type: String,
    required: [true, "Please Enter Unit of Measurement for product"],
    enum: ["kg", "piece", "litre", "box", "meter"],
    default: "piece",
  },
  department: {
    type: String,
    required: [true, "Please Enter product department"],
    enum: ["grocery", "IT", "furniture", "societies", "sports"],
    default: "IT",
  },
  status: {
    type: String,
    required: [true, "Please Enter Product status"],
    enum: ["Available", "Not available"],
    default: "Available",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
