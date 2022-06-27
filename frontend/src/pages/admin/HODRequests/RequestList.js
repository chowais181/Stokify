import React, { Fragment, useEffect, useState } from "react";

import { Icon } from "@iconify/react";

import Page from "../../../components/Page";

import { Stack, Button, Container, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllRequest,
  deleteRequest,
} from "../../../actions/reqInventoryAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import { DELETE_INVENTORYORDER_RESET } from "../../../constants/reqInventoryConstants";
import { styled } from "@mui/material/styles";
import { Box, OutlinedInput, InputAdornment } from "@mui/material";
import searchFill from "@iconify/icons-eva/search-fill";

// ------------------------------------------------------------------------
const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ------------------------------------------------------------------------

const RequestList = () => {
  const dispatch = useDispatch();
  const [name, setKeyword] = useState("");

  const alert = useAlert();
  const { error, requests } = useSelector((state) => state.allRequest);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.reqInventory
  );

  const deleteRequestHandler = (id) => {
    if (window.confirm("Are you sure to delete this Request?")) {
      dispatch(deleteRequest(id));
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Request Deleted Successfully");
      dispatch({ type: DELETE_INVENTORYORDER_RESET });
    }

    dispatch(getAllRequest());
  }, [dispatch, alert, error, isDeleted, deleteError]);

  const columns = [
    { field: "index", headerName: "#No", minWidth: 100, flex: 0.5 },
    { field: "id", headerName: "Inventory Request ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Accepted"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "username",
      headerName: "Requested By",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "User Email",
      minWidth: 250,
      flex: 0.3,
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
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              to={`/dashboard/requestlist/request/${params.getValue(
                params.id,
                "id"
              )}`}
            >
              <Icon
                icon="clarity:edit-solid"
                color="blue"
                width="22"
                height="22"
              />
            </Link>
            <Button>
              <Icon
                onClick={() =>
                  deleteRequestHandler(params.getValue(params.id, "id"))
                }
                icon="fluent:delete-24-filled"
                color="red"
                width="25"
                height="25"
              />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  requests &&
    requests
      .filter(
        (filteredProducts) =>
          filteredProducts.user.name.includes(name) ||
          filteredProducts.user.email.includes(name)
      )
      .reverse()
      .map((item, index) => {
        item.requestStatus === "Processing" &&
          rows.push({
            index: index + 1,
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.requestStatus,
            department: item.department,
            date: item.createdAt.substring(0, 16),
            username: item.user.name,
            email: item.user.email,
          });
        return 1;
      });

  return (
    <Fragment>
      <Page title={`ALL Rquests - Admin`}>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h4" gutterBottom>
              Requests List
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <SearchStyle
              backgroundColor="black"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by name or email ..."
              startAdornment={
                <InputAdornment position="end">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: "text.disabled" }}
                  />
                </InputAdornment>
              }
            />
          </Stack>

          <br />

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={13}
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            // className="productListTable"
            autoHeight
            sx={{
              m: 1,
              boxShadow: 2,
            }}
          />
        </Container>
      </Page>
    </Fragment>
  );
};

export default RequestList;
