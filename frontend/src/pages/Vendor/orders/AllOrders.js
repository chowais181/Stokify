import React, { Fragment, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./allOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllOrders } from "../../../actions/orderAction";
import Loader from "../../../components/Loader/Loader";
import { Stack, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import Page from "../../../components/Page";
import LaunchIcon from "@material-ui/icons/Launch";

import { Link } from "react-router-dom";

const AllOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  // const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Total Products",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            to={`/dashboard/allorders/processorder/${params.getValue(
              params.id,
              "id"
            )}`}
          >
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.reverse().map((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
      return 1;
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error]);

  return (
    <Page title="Orders">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h4" gutterBottom>
          All Orders
        </Typography>
      </Stack>
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              components={{ Toolbar: GridToolbar }}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
          </div>
        )}
      </Fragment>
    </Page>
  );
};

export default AllOrders;
