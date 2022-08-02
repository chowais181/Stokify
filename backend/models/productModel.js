const mongoose = require("mongoose");
//producr schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    default: " ",
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [8, "Stock cannot exceed 8 digits"],
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
    trim: true,
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
