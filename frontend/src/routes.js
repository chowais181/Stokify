import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
// import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import DashboardAdmin from "./pages/DashboardAdmin";

import ProductDetails from "./pages/Inventory/ProductDetails";

import User from "./pages/User";
import Inventory from "./pages/Inventory/Inventory";
import NotFound from "./pages/Page404";
import Purchases from "./pages/Purchases";
import NewUser from "./pages/admin/users/newUser/addUser";

// import { Route, Redirect } from "react-router";
import RequestInventory from "./pages/RequestInventory";
import Profile from "./components/user/Profile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import Cart from "./pages/Inventory/Cart/Cart";
// import Checkout from "./pages/Inventory/Cart/VendorSteps/CheckoutSteps";
import MyOrders from "./pages/Inventory/Cart/VendorSteps/MyOrders";
import OrderDetails from "./pages/Inventory/Cart/VendorSteps/OrderDetails";
import Shipping from "./pages/Inventory/Cart/VendorSteps/Shipping";
import ConfirmOrder from "./pages/Inventory/Cart/VendorSteps/ConfirmOrder";
import Payment from "./pages/Inventory/Cart/VendorSteps/Payment";
import OrderSuccess from "./pages/Inventory/Cart/VendorSteps/OrderSuccess";
import MyRequests from "./pages/Request Inventory/MyRequests";

import ReqInventoryDetail from "./pages/Request Inventory/ReqInventoryDetail";
import ConfirmRequest from "./pages/Request Inventory/ConfirmRequest";
import RequestSuccess from "./pages/Request Inventory/RequestSuccess";
import Loader from "./components/Loader/Loader";
//////////////////////////////////////
import ProductList from "./pages/admin/products/ProductList";
import NewProduct from "./pages/admin/products/newProduct/NewProduct";
import UpdateProduct from "./pages/admin/products/UpdateProduct";
import RequestList from "./pages/admin/requests/RequestList";
import ProcessRequest from "./pages/admin/requests/ProcessRequest";
// ----------------------------------------------------------------------
let isAdmin = false;
export default function Router() {
  const { user, loading } = useSelector((state) => state.user);

  let Dashboard = Loader;
  if (loading === false) {
    if (user && user.role === "Admin") {
      Dashboard = DashboardAdmin;
      isAdmin = true;
    } else {
      isAdmin = false;
      Dashboard = DashboardApp;
    }
  }
  console.log(isAdmin);

  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        {
          path: "app",
          element: <Dashboard />,
        },
        {
          path: "products",
          element: isAdmin ? <ProductList /> : <Navigate to="/" />,
        },
        {
          path: "products/newproduct",
          element: isAdmin ? <NewProduct /> : <Navigate to="/" />,
        },
        {
          path: "products/product/:id",
          element: isAdmin ? <UpdateProduct /> : <Navigate to="/" />,
        },
        { path: "purchases", element: <Purchases /> },
        { path: "user", element: <User /> },
        {
          path: "newuser",
          element: isAdmin ? <NewUser /> : <Navigate to="/" />,
        },

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
          path: "requestinventory/success",
          element: <RequestSuccess />,
        },
        {
          path: "myrequests",
          element: <MyRequests />,
        },

        {
          path: "myrequests/:id",
          element: <ReqInventoryDetail />,
        },
        {
          path: "requestlist",
          element: isAdmin ? <RequestList /> : <Navigate to="/" />,
        },
        {
          path: "requestlist/request/:id",
          element: isAdmin ? <ProcessRequest /> : <Navigate to="/" />,
        },
        {
          path: "myorders",
          element: <MyOrders />,
        },
        {
          path: "myorders/order/:id",
          element: <OrderDetails />,
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
          path: "shipping/success",
          element: <OrderSuccess />,
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
