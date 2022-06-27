import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../../actions/orderAction";
import Loader from "../../../components/Loader/Loader";
import { Button, Stack, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import Page from "../../../components/Page";
import LaunchIcon from "@material-ui/icons/Launch";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

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
            to={`/dashboard/myorders/order/${params.getValue(params.id, "id")}`}
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

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Page title={`${user && user.name} - Orders`}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="#"
          startIcon={<Icon icon={plusFill} />}
        >
          New Order
        </Button>
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
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />

            <Typography id="myOrdersHeading">
              {user && user.name}'s Orders
            </Typography>
          </div>
        )}
      </Fragment>
    </Page>
  );
};

export default MyOrders;
