const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

//config
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Routes imports
const order = require("./routes/orderRoute");
const reqInventory = require("./routes/reqInventoryRoute");
const product = require("./routes/productRoute");
const vendorProduct = require("./routes/vendorProductRoute");
const user = require("./routes/userRoute");
const payment = require("./routes/paymentRoute");
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", reqInventory);
app.use("/api/v1", product);
app.use("/api/v1", vendorProduct);
app.use("/api/v1", user);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//Middleware for errors
app.use(errorMiddleware);

module.exports = app;
