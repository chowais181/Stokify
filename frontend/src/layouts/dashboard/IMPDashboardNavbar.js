import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
// material
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";
// components
import { MHidden } from "../../components/@material-extend";
//
import Searchbar from "./Searchbar";
import AccountPopover from "./AccountPopover";
import AddPopover from "./AdminAddPopover";
import NotificationsPopover from "./NotificationsPopover";
import PurchasesPopover from "./PurchasesPopover";
import InventoryCartPopover from "./InventoryCartPopover";
import InventoryCartPopoverSM from "./InventoryCartPopoverSM";
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {loading === false && user && user.role === "Admin" && <AddPopover />}
          {loading === false && user && user.role === "Admin" && (
            <PurchasesPopover />
          )}
          <div
            style={{
              display:
                (user && user.role === "Admin") ||
                (user && user.role === "Coordinator") ||
                (user && user.role === "Vendor") ||
                (user && user.role === "Account Officer") ||
                (user && user.role === "Stock Manager")
                  ? "none"
                  : "block",
            }}
          >
            <InventoryCartPopover />
          </div>
          <div
            style={{
              display: user && user.role === "Stock Manager" ? "block" : "none",
            }}
          >
            <InventoryCartPopoverSM />
          </div>

          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
