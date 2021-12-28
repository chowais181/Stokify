// import { useState } from "react";

// material
import { Button } from "@mui/material";
import Select from "react-select";
// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High" },
  { value: "priceAsc", label: "Price: Low" },
  { value: "stockAsc", label: "Stock: High" },
  { value: "stockDesc", label: "Stock: Low" },
];

export default function ShopProductSort() {
  // const [open, setOpen] = useState(null);

  // const handleOpen = (event) => {
  //   setOpen(event.currentTarget);
  // };

  return (
    <>
      <Button color="inherit">
        Sort By
        <Select
          style={{ "font-size": "2px" }}
          defaultValue={SORT_BY_OPTIONS[0]}
          options={SORT_BY_OPTIONS}
        />
      </Button>
    </>
  );
}
