import { Icon } from "@iconify/react";
import { useRef, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import { Box, MenuItem, IconButton } from "@mui/material";

// components
import MenuPopover from "../../components/MenuPopover";
//

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Add Product",
    icon: "ic:baseline-production-quantity-limits",
    linkTo: "/dashboard/products/newproduct",
  },
  {
    label: "Add User",
    icon: "bi:person-plus",
    linkTo: "/dashboard/users/newuser",
  },
];

// ----------------------------------------------------------------------

export default function AddPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          color: "black",
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Icon icon="bi:plus-circle-dotted" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
