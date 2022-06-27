// material
import { Box, Grid, Container, Typography } from "@mui/material";
// components
import Page from "../../components/Page";
import {
  MyRequests,
  Approved,
  UserRequestOrderTimeline,
  InventoryReturnTimeline,
  TotalReturnInventory,
} from "../../components/_dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Stokify">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={4}>
            <MyRequests />
          </Grid>
          <Grid item xs={12} md={8} lg={4}>
            <Approved />
          </Grid>{" "}
          <Grid item xs={12} md={8} lg={4}>
            <TotalReturnInventory />
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <UserRequestOrderTimeline />
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <InventoryReturnTimeline />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
