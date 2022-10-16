import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
//////////////////////DASHBOARDS////////////////////////////
import DashboardApp from "./pages/Dashboards/DashboardApp";
import DashboardAdmin from "./pages/Dashboards/DashboardAdmin";
import DashboardStockManager from "./pages/Dashboards/DashboardStockManager";
import DashboardVendor from "./pages/Dashboards/DashboardVendor";
import DashboardCod from "./pages/Dashboards/DashboardCod";
import DashboardAO from "./pages/Dashboards/DashboardAO";
////////////////////SM////////////////////////////////
import StartOrdering from "./pages/StockManager/OrderFromVendor/StartOrdering";
import OrderProducts from "./pages/StockManager/OrderFromVendor/Inventory";
import OrderProductDetail from "./pages/StockManager/OrderFromVendor/ProductDetails";
import SMCart from "./pages/StockManager/OrderFromVendor/Cart/Cart";
////////////////////////////////////////////////////
import About from "./pages/About";
import Users from "./pages/admin/users/UserList";
import NewUser from "./pages/admin/users/newUser/addUser";
import UpdateUser from "./pages/admin/users/UpdateUser";
import Inventory from "./pages/User Inventory/Inventory";
import NotFound from "./pages/Page404";
// import Purchases from "./pages/Purchases";

// import { Route, Redirect } from "react-router";
import RequestInventory from "./pages/RequestInventory";
import Profile from "./components/UserProfile/Profile";
import UpdatePassword from "./components/UserProfile/UpdatePassword";
import ForgotPassword from "./components/UserProfile/ForgotPassword";
import Cart from "./pages/User Inventory/Cart/Cart";
// import Checkout from "./pages/Inventory/Cart/VendorSteps/CheckoutSteps";
import MyOrders from "./pages/StockManager/SMOrderSteps/MyOrders";
import OrderDetails from "./pages/StockManager/SMOrderSteps/OrderDetails";
import Shipping from "./pages/StockManager/SMOrderSteps/Shipping";
import ConfirmOrder from "./pages/StockManager/SMOrderSteps/ConfirmOrder";
import Payment from "./pages/StockManager/SMOrderSteps/Payment";
import OrderSuccess from "./pages/StockManager/SMOrderSteps/OrderSuccess";
import MyRequests from "./pages/User Request Inventory/MyRequests";

import ProductDetails from "./pages/User Inventory/ProductDetails";
import ReqInventoryDetail from "./pages/User Request Inventory/ReqInventoryDetail";
import ConfirmRequest from "./pages/User Request Inventory/ConfirmRequest";
import RequestSuccess from "./pages/User Request Inventory/RequestSuccess";
import Loader from "./components/Loader/Loader";
//////////////////////////////////////
import ProductList from "./pages/admin/products/ProductList";
import NewProduct from "./pages/admin/products/newProduct/NewProduct";
import UpdateProduct from "./pages/admin/products/UpdateProduct";
/////////////////////////////////////
import SMRequestList from "./pages/StockManager/requests/RequestList";
import SMProcessRequest from "./pages/StockManager/requests/ProcessRequest";
import Invoices from "./pages/Invoices";
// ------------------------Vendor----------------------------------------------
import VendorProductList from "./pages/Vendor/products/ProductList";
import NewVendorProduct from "./pages/Vendor/products/newProduct/NewProduct";
import UpdateVendorProduct from "./pages/Vendor/products/UpdateProduct";
import AllOrders from "./pages/Vendor/orders/AllOrders";
import ProcessOrder from "./pages/Vendor/orders/ProcessOrder";
// -------------------------HOD---------------------------------------------

import RequestList from "./pages/admin/HODRequests/RequestList";
import ProcessRequest from "./pages/admin/HODRequests/ProcessRequest";
//-----------------------------------------------

export default function Router() {
  const { user, loading } = useSelector((state) => state.user);
  console.log(user);
  let Dashboard = Loader;
  if (loading === false) {
    if (user && user.role === "Admin") {
      Dashboard = DashboardAdmin;
    } else if (user && user.role === "Stock Manager") {
      Dashboard = DashboardStockManager;
    } else if (user && user.role === "Vendor") {
      Dashboard = DashboardVendor;
    } else if (user && user.role === "Coordinator") {
      Dashboard = DashboardCod;
    } else if (user && user.role === "Account Officer") {
      Dashboard = DashboardAO;
    } else {
      Dashboard = DashboardApp;
    }
  }

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
          // element: isAdmin ? <ProductList /> : <Navigate to="/" />,
          element: <ProductList />,
        },
        {
          path: "products/newproduct",
          // element: isAdmin ? <NewProduct /> : <Navigate to="/" />,
          element: <NewProduct />,
        },
        {
          path: "products/product/:id",
          // element: isAdmin ? <UpdateProduct /> : <Navigate to="/" />,
          element: <UpdateProduct />,
        },
        { path: "about", element: <About /> },
        { path: "invoices", element: <Invoices /> },
        { path: "users", element: <Users /> },
        {
          path: "users/newuser",
          // element: isAdmin ? <NewUser /> : <Navigate to="/" />,
          element: <NewUser />,
        },
        {
          path: "users/user/:id",
          // element: isAdmin ? <UpdateProduct /> : <Navigate to="/" />,
          element: <UpdateUser />,
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
          path: "inventoryrequests",
          // element: isAdmin ? <RequestList /> : <Navigate to="/" />,
          element: <SMRequestList />,
        },
        {
          path: "inventoryrequests/request/:id",
          // element: isAdmin ? <ProcessRequest /> : <Navigate to="/" />,
          element: <SMProcessRequest />,
        },
        /////////////////HOD////////////////
        {
          path: "requestlist",
          // element: isAdmin ? <RequestList /> : <Navigate to="/" />,
          element: <RequestList />,
        },
        {
          path: "requestlist/request/:id",
          // element: isAdmin ? <ProcessRequest /> : <Navigate to="/" />,
          element: <ProcessRequest />,
        },
        {
          path: "neworder",
          element: <StartOrdering />,
        },
        {
          path: "neworder/products/:department",
          element: <OrderProducts />,
        },
        {
          path: "neworder/products/:department/:id",
          element: <OrderProductDetail />,
        },
        {
          path: "neworder/products/:department/cart",
          element: <SMCart />,
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
        /////////////////vendor////////////
        {
          path: "vendorproducts",
          element: <VendorProductList />,
        },
        {
          path: "vendorproducts/newproduct",
          // element: isAdmin ? <NewProduct /> : <Navigate to="/" />,
          element: <NewVendorProduct />,
        },
        {
          path: "vendorproducts/product/:id",
          // element: isAdmin ? <UpdateProduct /> : <Navigate to="/" />,
          element: <UpdateVendorProduct />,
        },
        {
          path: "allorders",
          // element: isAdmin ? <UpdateProduct /> : <Navigate to="/" />,
          element: <AllOrders />,
        },
        {
          path: "allorders/processorder/:id",
          // element: isAdmin ? <UpdateProduct /> : <Navigate to="/" />,
          element: <ProcessOrder />,
        },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "password/forgot", element: <ForgotPassword /> },
        { path: "404", element: <NotFound /> },
        // { path: "/", element: <Navigate to="/dashboard/app" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
