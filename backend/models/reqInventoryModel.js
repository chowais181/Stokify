const mongoose = require("mongoose");

const reqInventorySchema = new mongoose.Schema({
  department: {
    type: String,
    required: [true, "Please Choose the Department"],
    enum: ["grocery", "IT", "furniture", "societies", "sports"],
    default: "grocery",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
      },
      itemDescription: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  requestStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: {
    type: String,
    default: "",
  },
  returnDate: {
    type: String,
    default: "",
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
});

module.exports = mongoose.model("ReqInventory", reqInventorySchema);
