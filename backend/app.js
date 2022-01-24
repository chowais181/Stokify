const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Routes imports
const reqInventory = require("./routes/reqInventoryRoute");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", reqInventory);
app.use("/api/v1", product);
app.use("/api/v1", user);

//Middleware for errors
app.use(errorMiddleware);

module.exports = app;
