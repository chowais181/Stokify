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
    const myForm = new FormData();

    myForm.set("requestStatus", status);

    dispatch(updateRequest(id, myForm));
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
                    <p>Name:</p>
                    <span>{request && request.user && request.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {request && request.user && request.user.phoneNumber}
                    </span>
                  </div>
                  <div>
                    <p>Email:</p>
                    <span>{request && request.user && request.user.email}</span>
                  </div>
                </div>

                <Typography>Request Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        request &&
                        request.requestStatus &&
                        request.requestStatus === "Delivered"
                          ? "greenColor"
                          : "blueColor"
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
            <div>
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
                        <option value="">
                          Update Inventory Request Status
                        </option>
                        <option value="Delivered">Delivered</option>
                        <option value="Not Delivered">Not Delivered</option>
                      </select>
                    </div>

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

               {/* ///////return date of inventory //// */}
                      
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
          </Card>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProcessRequest;
