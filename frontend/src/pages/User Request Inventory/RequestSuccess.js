import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./RequestSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const RequestSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Request has been sent successfully! </Typography>
      <h3>Wait for response!You will notify soon</h3>
      <Link to="/dashboard/myrequests">View your Requests</Link>
    </div>
  );
};

export default RequestSuccess;
