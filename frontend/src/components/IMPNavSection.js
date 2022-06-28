import { useState } from "react";
import PropTypes from "prop-types";

import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { useSelector } from "react-redux";
// -------------------------icon -----------------------------------------

import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

//

//sidebar menu color when not active
const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: "#555555",
  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: "#555555",
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  //sidebar menu color when active
  const activeRootStyle = {
    color: "#ff7600",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    "&:before": { display: "block" },
  };

  const activeSubStyle = {
    color: "#555555",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: "flex",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "text.disabled",
                        transition: (theme) =>
                          theme.transitions.create("transform"),
                        ...(isActiveSub && {
                          transform: "scale(2)",
                          bgcolor: "#ff7600",
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

//////////////////////ADMIN/////////////////////////////////////////
const sidebarAdmin = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },

  {
    title: "products",
    path: "/dashboard/products",
    icon: getIcon("ic:baseline-production-quantity-limits"),
  },
  {
    title: "users",
    path: "/dashboard/users",
    icon: getIcon("fe:users"),
  },
  {
    title: "invoices",
    path: "/dashboard/invoices",
    icon: getIcon("material-symbols:payments-outline-sharp"),
  },
  {
    title: "About Us",
    path: "/dashboard/about",
    icon: getIcon("bi:info-circle"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: getIcon(alertTriangleFill),
  },
];
/////////////////////// by default ////////////////////////////////////////

const sidebarConfig0 = [
  {
    title: "loading",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
];
/////////////////////// for staff/faculty/student ////////////////////////////////////////
const sidebarConigUser = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },

  {
    title: "inventory",
    path: "/dashboard/requestinventory",
    icon: getIcon("vaadin:stock"),
  },
  {
    title: "my requests",
    path: "/dashboard/myrequests",
    icon: getIcon("carbon:order-details"),
  },

  {
    title: "About Us",
    path: "/dashboard/about",
    icon: getIcon("bi:info-circle"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: getIcon(alertTriangleFill),
  },
];
/////////////////////// Coordinator ////////////////////////////////////////
const sidebarCod = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "inventory requests",
    path: "/dashboard/requestlist",
    icon: getIcon("carbon:order-details"),
  },

  {
    title: "About Us",
    path: "/dashboard/about",
    icon: getIcon("bi:info-circle"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: getIcon(alertTriangleFill),
  },
];
/////////////////////// Account officer ////////////////////////////////////////
const sidebarAO = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },

  {
    title: "invoices",
    path: "/dashboard/invoices",
    icon: getIcon("material-symbols:payments-outline-sharp"),
  },

  {
    title: "About Us",
    path: "/dashboard/about",
    icon: getIcon("bi:info-circle"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: getIcon(alertTriangleFill),
  },
];
////////////////////sidebarStockManager//////////////////////////////////////////
const sidebarStockManager = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "inventory requests",
    path: "/dashboard/inventoryrequests",
    icon: getIcon("carbon:order-details"),
  },
  {
    title: "products",
    path: "/dashboard/products",
    icon: getIcon("ic:baseline-production-quantity-limits"),
  },
  {
    title: "place order",
    path: "/dashboard/neworder",
    icon: getIcon("vaadin:stock"),
  },
  {
    title: "my orders",
    path: "/dashboard/myorders",
    icon: getIcon("carbon:order-details"),
  },
  {
    title: "invoices",
    path: "/dashboard/invoices",
    icon: getIcon("material-symbols:payments-outline-sharp"),
  },

  {
    title: "shipping",
    path: "/dashboard/shipping",
    icon: getIcon("fa-solid:shipping-fast"),
  },
  {
    title: "About Us",
    path: "/dashboard/about",
    icon: getIcon("bi:info-circle"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: getIcon(alertTriangleFill),
  },
];

////////////////////Vendor//////////////////////////////////////////
const sidebarVendor = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "products",
    path: "/dashboard/vendorproducts",
    icon: getIcon("ic:baseline-production-quantity-limits"),
  },
  {
    title: "recieved orders",
    path: "/dashboard/allorders",
    icon: getIcon("carbon:order-details"),
  },

  {
    title: "invoices",
    path: "/dashboard/invoices",
    icon: getIcon("material-symbols:payments-outline-sharp"),
  },
  {
    title: "About Us",
    path: "/dashboard/about",
    icon: getIcon("bi:info-circle"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: getIcon(alertTriangleFill),
  },
];
//////////////////////////////////////////////////////////////
export default function NavSection({ navConfig, ...other }) {
  const { user } = useSelector((state) => state.user);

  let side = sidebarConfig0;

  if (user) {
    if (user.role === "Admin") {
      side = sidebarAdmin;
    } else if (user.role === "Stock Manager") {
      side = sidebarStockManager;
    } else if (user.role === "Vendor") {
      side = sidebarVendor;
    } else if (user.role === "Coordinator") {
      side = sidebarCod;
    } else if (user.role === "Account Officer") {
      side = sidebarAO;
    } else {
      side = sidebarConigUser;
    }
  }

  const { pathname } = useLocation();
  const match = (path) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <Box {...other}>
      <List disablePadding>
        {side.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
