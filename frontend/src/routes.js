import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
// import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Products from "./pages/Products";
import ProductDetails from "./pages/Inventory/ProductDetails";

import User from "./pages/User";
import Inventory from "./pages/Inventory/Inventory";
import NotFound from "./pages/Page404";
import Purchases from "./pages/Purchases";
import NewUser from "./pages/newUser/addUser";
import NewProduct from "./pages/newProduct/newItem";
import Order from "./pages/Orders";
// import { Route, Redirect } from "react-router";
import RequestInventory from "./pages/RequestInventory";
import Profile from "./components/user/Profile";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <DashboardApp /> },
        { path: "orders", element: <Order /> },
        { path: "purchases", element: <Purchases /> },
        { path: "user", element: <User /> },
        { path: "newuser", element: <NewUser /> },
        { path: "products", element: <Products /> },
        { path: "newproduct", element: <NewProduct /> },

        { path: "profile", element: <Profile /> },

        { path: "requestinventory", element: <RequestInventory /> },

        { path: "inventoryitems", element: <Inventory /> },
        { path: "inventoryitem/:department/:id", element: <ProductDetails /> },
        { path: "inventoryitems/:department", element: <Inventory /> },
        { path: "inventoryitems/:department/:name", element: <Inventory /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        // { path: ":register", element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
