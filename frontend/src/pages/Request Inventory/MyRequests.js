import { Fragment, useEffect } from "react";
import * as React from "react";
// import DataGrid from "react-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import "./myRequests.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myRequests } from "../../actions/reqInventoryAction";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";

import LaunchIcon from "@material-ui/icons/Launch";

const MyRequests = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.myRequests);
  const { user, loading } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "department",
      headerName: "Department",
      minWidth: 170,
      flex: 0.5,
    },
    {
      field: "date",
      headerName: "Date",
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
          <Link to={`/dashboard/requests/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.requestStatus,
        department: item.department,
        date: item.createdAt,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myRequests());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
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
  );
};

export default MyRequests;
