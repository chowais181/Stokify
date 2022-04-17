// material
import { Box, Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import {
  TotalAmount,
  AppNewUsers,
  AppItemOrders,
  AppOrderTimeline,
  TotalProducts,
  TotalProductsByCategory,
  AppWebsiteVisits,
  ChartTotalAmount,
  DoughnutStockChart,
} from "../components/_dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardAdmin() {
  return (
    <Page title="Dashboard | Stokify">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back Admin</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TotalAmount />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TotalProducts />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} md={4} lg={4.5}>
            <DoughnutStockChart />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TotalProductsByCategory />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <ChartTotalAmount />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
