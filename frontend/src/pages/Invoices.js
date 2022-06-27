//// ---Purchases --- ///
import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";

import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllOrders } from "../actions/orderAction";
// import { sampleProducts } from "./sample-products";
// material
import { Button, Container, Stack, Typography } from "@mui/material";
// components
import Page from "../components/Page";

export default function Invoices() {
  const dispatch = useDispatch();
  const { error, orders } = useSelector((state) => state.allOrders);
  let gridPDFExport;
  const exportPDF = () => {
    if (gridPDFExport !== null) {
      gridPDFExport.save();
    }
  };

  const columns = [
    { field: "userid", headerName: "User ID", minWidth: 200, flex: 1 },
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 1 },

    {
      field: "status",
      headerName: "Payment Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "succeeded"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "amount",
      headerName: "Total Amount",
      type: "number",
      minWidth: 120,
      flex: 0.5,
    },
    {
      field: "paidAt",
      headerName: "Paid At",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
  ];
  const rows = [];

  orders &&
    orders.reverse().map((item) => {
      rows.push({
        userid: item.user,
        id: item._id,
        status: item.paymentInfo.status,
        amount: item.totalPrice,
        paidAt: item.paidAt.substring(0, 10),
      });
      return 1;
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllOrders());
  }, [dispatch, error]);
  console.log(rows);

  const grid = (
    <Grid data={orders && orders}>
      <Column field="user" title="Paid By User" width="220px" />
      <Column field="_id" title="Order ID" width="200px" />
      <Column field="paymentInfo.status" title="Payment Status" width="200" />
      <Column field="totalPrice" title="Total Price" width="100px" />
      <Column field="paidAt" title="Paid At" width="220px" />
    </Grid>
  );
  return (
    <Page title="Dashboard: Purchases | Stokify">
      <div>
        <GridPDFExport ref={(pdfExport) => (gridPDFExport = pdfExport)}>
          {grid}
        </GridPDFExport>
      </div>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Invoices
          </Typography>
          <Button
            onClick={exportPDF}
            startIcon={<Icon icon="carbon:generate-pdf" />}
          >
            Generate PDF
          </Button>
        </Stack>

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
        </Stack>
      </Container>
    </Page>
  );
}
