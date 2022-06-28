///
import { Icon } from "@iconify/react";

import Select from "react-select";
//navigate to search something
import { useNavigate } from "react-router-dom";
// material
import { Button, Container, Stack, Typography } from "@mui/material";
// components
import Page from "../../../components/Page";
import { useState } from "react";

const optionsDept = [
  { value: "IT", label: "IT" },
  { value: "furniture", label: "Furniture" },
  { value: "grocery", label: "Grocery" },
  { value: "societies", label: "Societies" },
  { value: "sports", label: "Sports" },
];

export default function RequestInventory() {
  const navigate = useNavigate();
  const [option, setOption] = useState(optionsDept[0]);

  const Proceed = () => {
    if (option.label != null) {
      // navigate to selected dept
      if (option.label.trim()) {
        navigate(`/dashboard/neworder/products/${option.value}`);
      }
    }
  };

  return (
    <Page title="Dashboard: Place Order | Stokify">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Order Inventory
          </Typography>
        </Stack>
        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h7" gutterBottom>
            Select the Category for order.......
            <Select
              defaultValue={optionsDept[0]}
              options={optionsDept}
              onChange={setOption}
            />
          </Typography>
        </Stack>

        <Button variant="contained" onClick={Proceed} color="warning">
          <Icon icon="ic:outline-inventory" width="30" />
          Proceed
        </Button>
      </Container>
    </Page>
  );
}
