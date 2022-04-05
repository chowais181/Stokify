import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./RequestInventorySuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const RequestInventorySuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>
              Your Request is Forwarded! {" "}
              <span>Wait for response</span>
      </Typography>
      <Link to="/dashboard/requests">View Inventory Requests </Link>
    </div>
  );
};

export default RequestInventory;
