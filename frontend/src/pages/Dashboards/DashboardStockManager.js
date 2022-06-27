// material
import { Box, Grid, Container, Typography } from "@mui/material";
import * as React from "react";
// components
import Page from "../../components/Page";
import {
  TotalAmount,
  TotalRequest,
  TotalOrder,
  TotalProducts,
  TotalProductsByCategory,
  SMInventoryReturnTimeline,
  SMTotalReturnInventory,
  DoughnutStockChart,
} from "../../components/_dashboard/app";

import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// ----------------------------------------------------------------------
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ----------------------------------------------------------------------

export default function DashboardAdmin() {
  let outOfStock = 0;
  var text = "";
  const { allProducts, loading } = useSelector((state) => state.products);
  if (loading === false) {
    allProducts &&
      allProducts.forEach((item) => {
        if (item.Stock === 0) {
          outOfStock += 1;
        }
      });
    text = `Your ${outOfStock} products are out of Stock!\nRe stock `;
  }

  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Page title="Dashboard | Stokify">
      <div
        style={{
          display: outOfStock > 0 ? "block" : "none",
        }}
      >
        {" "}
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            <p style={{ color: "black" }}>{text}</p>
          </Alert>
        </Snackbar>
      </div>

      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome Stock Manager</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={2.2}>
            <TotalAmount />
          </Grid>
          <Grid item xs={12} sm={6} md={2.2}>
            <TotalProducts />
          </Grid>

          <Grid item xs={12} sm={6} md={2.2}>
            <TotalRequest />
          </Grid>
          <Grid item xs={12} sm={6} md={2.2}>
            <SMTotalReturnInventory />
          </Grid>
          <Grid item xs={12} sm={6} md={2.2}>
            <TotalOrder />
          </Grid>
          <Grid item xs={12} md={6} lg={4.5}>
            <DoughnutStockChart />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TotalProductsByCategory />
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <SMInventoryReturnTimeline />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
