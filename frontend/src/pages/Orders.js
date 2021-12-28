import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import { Button, Container, Stack, Typography } from "@mui/material";
// components
import Page from "../components/Page";

export default function Inventory() {
  return (
    <Page title="Dashboard: Orders | Stokify">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Orders
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/newproduct"
            startIcon={<Icon icon={plusFill} />}
          >
            New Item
          </Button>
        </Stack>

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        ></Stack>
      </Container>
    </Page>
  );
}
