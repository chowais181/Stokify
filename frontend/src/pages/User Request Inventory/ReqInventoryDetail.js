import React, { Fragment, useEffect } from "react";
import "./ReqInventoryDetail.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import Page from "../../components/Page";
import { useParams } from "react-router-dom";
import { Typography, Grid } from "@mui/material";

import {
  getRequestDetails,
  clearErrors,
} from "../../actions/reqInventoryAction";
import Loader from "../../components/Loader/Loader";
import { useAlert } from "react-alert";
const columns = [
  {
    field: "id",
    headerName: "#No",
    minWidth: 50,
    flex: 0.3,
    backgroundColor: "lightgray",
  },
  {
    field: "name",
    headerName: "Product Name",
    minWidth: 150,
    flex: 0.5,
    backgroundColor: "lightgray",
  },
  {
    field: "qty",
    headerName: "Quantity",
    minWidth: 150,
    flex: 0.5,
  },
];

const ReqInventoryDetail = () => {
  const { id } = useParams();
  var returnDate = "";
  const { request, error, loading } = useSelector(
    (state) => state.reqInventoryDetails
  );

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getRequestDetails(id));
  }, [dispatch, alert, error, id]);
  const rows = [];
  if (loading === false) {
    returnDate = `${request && request.returnDate}`;
    request &&
      request.orderItems &&
      request.orderItems.map((item, index) => {
        rows.push({
          id: index + 1,
          qty: item.quantity,
          name: item.name,
        });
        return 1;
      });
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Page title="Request Inventory Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography color="primary">
                Request ID #{request && request._id}
              </Typography>
              <Typography>User Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>
                    Name:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {request && request.user && request.user.name}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Phone:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {request && request.user && request.user.phoneNumber}
                    </span>
                  </p>
                </div>
                <div></div>
              </div>

              <Typography>Request Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      request &&
                      request.requestStatus &&
                      request.requestStatus === "Accepted"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {request && request.requestStatus}
                  </p>
                </div>
              </div>
              <Typography>Inventory Return Date</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p style={{ color: "blue" }}>
                    {returnDate === ""
                      ? "no return date"
                      : returnDate.substring(0, 16)}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Requested Items</Typography>
              <br />
              <Grid container spacing={3}>
                <Grid item xs={8} sm={6}>
                  <DataGrid
                    backgroundColor="lightgray"
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="myOrdersTable"
                    autoHeight
                    sx={{
                      boxShadow: 2,
                      border: 2,
                      borderColor: "secondary.light",
                      "& .MuiDataGrid-cell:hover": {
                        color: "info.main",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ReqInventoryDetail;
