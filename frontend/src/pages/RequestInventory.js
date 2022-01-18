import { Icon } from "@iconify/react";

import { Link as RouterLink } from "react-router-dom";
import Select from "react-select";

// material
import { Button, Container, Stack, Typography } from "@mui/material";
// components
import Page from "../components/Page";

export default function Purchases() {
     const optionsDept = [
       { value: "IT", label: "IT" },
       { value: "furniture", label: "Furniture" },
       { value: "grocery", label: "Grocery" },
       { value: "societies", label: "Societies" },
       { value: "sports", label: "Sports" },
     ];
  
  return (
    <Page title="Dashboard: Purchases | Stokify">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Request Inventory
          </Typography>
        </Stack>

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h7" gutterBottom>
            Select the Concerned Department :
            <Select defaultValue={optionsDept[0]} options={optionsDept} />
          </Typography>
        </Stack>

        <Button
          variant="contained"
          component={RouterLink}
          to="/dashboard/inventoryitems"
          color="warning"
        >
          <Icon icon="ic:outline-inventory" width="30" />
          Proceed
        </Button>
      </Container>
    </Page>
  );
}

