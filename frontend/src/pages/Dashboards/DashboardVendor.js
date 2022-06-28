// material
import { Box, Grid, Container, Typography } from "@mui/material";
import * as React from "react";
// components
import Page from "../../components/Page";
import {
  VendorTotalAmount,
  VendorTotalOrders,
  VendorTotalProducts,
  VendorDoughnutStockChart,
} from "../../components/_dashboard/app";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function DashboardAdmin() {
  return (
    <Page title="Dashboard | Stokify">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Vendor Dahshboard</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <VendorTotalAmount />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <VendorTotalProducts />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <VendorTotalOrders />
          </Grid>
          <Grid item xs={12} md={6} lg={4.5}>
            <VendorDoughnutStockChart />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
