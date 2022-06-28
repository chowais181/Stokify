import React, { Fragment, useEffect, useState, useRef } from "react";
// import "./ReqInventoryDetail.css";
import { Icon } from "@iconify/react";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { useSelector, useDispatch } from "react-redux";
import Page from "../../../components/Page";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { Grid, Typography, Button, Card } from "@mui/material";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import {
  getRequestDetails,
  clearErrors,
  updateRequest,
} from "../../../actions/reqInventoryAction";
import { UPDATE_INVENTORYORDER_RESET } from "../../../constants/reqInventoryConstants";
import Loader from "../../../components/Loader/Loader";
import { useAlert } from "react-alert";
import "./processRequest.css";

////////////////////////////
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

const ProcessRequest = () => {
  const form = useRef();
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const MoveBack = () => {
    //going to previous page by using navigate -1
    //and we can go forward by using 1
    navigate(-1);
  };
  const { request, error, loading } = useSelector(
    (state) => state.reqInventoryDetails
  );
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.reqInventory
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const updateRequestSubmitHandler = (e) => {
    e.preventDefault();
     emailjs
          .sendForm(
            "service_546uk9a",
            "template_enc0b4x",
            form.current,
            "YMs3ef2fvu8QUd8nC"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );

    dispatch(updateRequest(id, status, ""));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Request status Updated Successfully!");
      dispatch({ type: UPDATE_INVENTORYORDER_RESET });
    }

    dispatch(getRequestDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  const rows = [];

  if (loading === false) {
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
          <Card>
            <div className="orderDetailsPage">
              <div className="orderDetailsContainer">
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
                  <div>
                    <p>
                      Email:{" "}
                      <span style={{ fontWeight: "normal" }}>
                        {request && request.user && request.user.email}
                      </span>
                    </p>
                  </div>
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
            <div
              style={{
                display:
                  request && request.requestStatus === "Accepted"
                    ? "none"
                    : "block",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <form
                    ref={form}
                    className="updateOrderForm"
                    onSubmit={updateRequestSubmitHandler}
                  >
                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Update Request Status</option>
                        {/* {request.requestStatus === "Processing" && ( */}
                        <option value="Accepted">Accept</option>

                        {/* )} */}

                        {/* {request.requestStatus === "Processing" && ( */}
                        <option value="Rejected">Reject</option>
                        {/* )} */}
                      </select>
                    </div>
                    {/* //////////////////////////////////////////////////////// */}
                    <input
                      type="hidden"
                      name="to_name"
                      value={request && request.user && request.user.name}
                    />
                    <input
                      type="hidden"
                      name="user_email"
                      value={request && request.user && request.user.email}
                    />
                    <input
                      type="hidden"
                      name="message"
                      value={`Your request for inventory is updated.\nTo see the detail click on this link: \n http://localhost:3000/dashboard/myrequests`}
                    />
                    {/* //////////////////////////////////////////////////////// */}
                    <Button
                      id="createProductBtn"
                      variant="contained"
                      color="secondary"
                      startIcon={<Icon icon="clarity:process-on-vm-line" />}
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Proceed
                    </Button>
                  </form>
                </Grid>
              </Grid>
            </div>

            <Button
              variant="contained"
              onClick={MoveBack}
              color="warning"
              style={{ margin: "60px" }}
            >
              <Icon icon="akar-icons:arrow-back" width="40" />
              Back to list
            </Button>
          </Card>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProcessRequest;
