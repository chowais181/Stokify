//// not in use ....
//// ---Purchases --- ///
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";

// material
import { Button, Container, Stack, Typography } from "@mui/material";
// components
import Page from "../components/Page";


export default function Purchases() {
  return (
    <Page title="Dashboard: Purchases | Stokify">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom></Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Order
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
