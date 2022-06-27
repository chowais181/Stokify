import { Fragment, useEffect } from "react";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./myRequests.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myRequests } from "../../actions/reqInventoryAction";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
import LaunchIcon from "@material-ui/icons/Launch";
import Page from "../../components/Page";
const MyRequests = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, requests } = useSelector((state) => state.myRequests);
  const { user, loading } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Inventory Request ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Accepted"
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
      field: "department",
      headerName: "Department",
      minWidth: 170,
      flex: 0.5,
    },
    {
      field: "date",
      headerName: "Requested Date",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "return_date",
      headerName: "Return Date",
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
            to={`/dashboard/myrequests/${params.getValue(params.id, "id")}`}
          >
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  requests &&
    requests.reverse().map((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.requestStatus,
        department: item.department,
        date: item.createdAt.substring(0, 16),
        return_date: item.returnDate.substring(0, 16),
      });
      return 1;
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myRequests());
  }, [dispatch, alert, error]);

  return (
    <Page title="Dashboard: My Requests | Stokify">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h4" gutterBottom>
          My Requests
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/dashboard/requestinventory"
          startIcon={<Icon icon={plusFill} />}
        >
          New Inventory Request
        </Button>
      </Stack>

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
              {user && user.name}'s Inventory Orders
            </Typography>
          </div>
        )}
      </Fragment>
    </Page>
  );
};

export default MyRequests;
