import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";
import PurchasesPopover from "./PurchasesPopover";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
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
    title: "inventory",
    path: "/dashboard/requestinventory",
    icon: getIcon("vaadin:stock"),
  },
  {
    title: "orders",
    path: "/dashboard/orders",
    icon: getIcon("carbon:order-details"),
  },
  {
    title: "users",
    path: "/dashboard/user",
    icon: getIcon("fe:users"),
  },
  {
    title: <PurchasesPopover />,
    path: "#",
    icon: getIcon("icons8:buy"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: getIcon(alertTriangleFill),
  },
];

export default sidebarConfig;
