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

// import { Route, Redirect } from "react-router";
import RequestInventory from "./pages/RequestInventory";
import Profile from "./components/user/Profile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import Cart from "./pages/Inventory/Cart/Cart";
import Checkout from "./pages/Inventory/Cart/VendorSteps/CheckoutSteps";
import Shipping from "./pages/Inventory/Cart/VendorSteps/Shipping";
import ConfirmOrder from "./pages/Inventory/Cart/VendorSteps/ConfirmOrder";
import Payment from "./pages/Inventory/Cart/VendorSteps/Payment";
import OrderSuccess from "./pages/Inventory/Cart/VendorSteps/OrderSuccess";
import MyRequests from "./pages/Request Inventory/MyRequests";
import GridView from "./pages/Request Inventory/MyRequests";
import ReqInventoryDetail from "./pages/Request Inventory/ReqInventoryDetail";
import ConfirmRequest from "./pages/Request Inventory/ConfirmRequest"

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <DashboardApp /> },
        { path: "purchases", element: <Purchases /> },
        { path: "user", element: <User /> },
        { path: "newuser", element: <NewUser /> },
        { path: "products", element: <Products /> },
        { path: "newproduct", element: <NewProduct /> },
        { path: "profile", element: <Profile /> },
        { path: "password/update", element: <UpdatePassword /> },
        { path: "requestinventory", element: <RequestInventory /> },
        { path: "requestinventory/inventoryitems", element: <Inventory /> },
        {
          path: "requestinventory/inventoryitem/:department/:id",
          element: <ProductDetails />,
        },
        {
          path: "requestinventory/inventoryitems/:department",
          element: <Inventory />,
        },
        {
          path: "requestinventory/inventoryitems/:department/:name",
          element: <Inventory />,
        },
        {
          path: "requestinventory/inventoryitems/:department/cart",
          element: <Cart />,
        },
        {
          path: "requestinventory/inventoryitems/confirmrequest",
          element: <ConfirmRequest />,
        },
        {
          path: "shipping",
          element: <Shipping />,
        },
        {
          path: "shipping/order/confirm",
          element: <ConfirmOrder />,
        },
        {
          path: "shipping/order/confirm/process/payment",
          element: <Payment />,
        },
        {
          path: "success",
          element: <OrderSuccess />,
        },
        {
          path: "requests",
          element: <MyRequests />,
        },

        {
          path: "requests/:id",
          element: <ReqInventoryDetail />,
        },
        {
          path: "gridview",
          element: <GridView />,
        },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        // { path: ":register", element: <Register /> },
        { path: "password/forgot", element: <ForgotPassword /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
