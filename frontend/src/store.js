import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allUsersReducer,
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  userDetailsReducer,
} from "./reducers/userReducer";
import {
  productDetailsReducer,
  productsReducer,
  newProductReducer,
  productReducer,
} from "./reducers/productReducer";
import {
  vendorProductDetailsReducer,
  vendorProductsReducer,
  newVendorProductReducer,
  vendorProductReducer,
} from "./reducers/vendorProductReducer";

import { cartReducer } from "./reducers/cartReducer";
// import { vendorCartReducer } from "./reducers/vendorCartReducer";
import {
  createReqInventoryReducer,
  myRequestsReducer,
  allRequestReducer,
  requestDetailsReducer,
  reqInventoryReducer,
} from "./reducers/reqInventoryReducer";

import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  newProduct: newProductReducer,
  products: productsReducer,
  product: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  allUsers: allUsersReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newReqInventory: createReqInventoryReducer,
  myRequests: myRequestsReducer,
  reqInventory: reqInventoryReducer,
  allRequest: allRequestReducer,
  reqInventoryDetails: requestDetailsReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  newVendorProduct: newVendorProductReducer,
  vendorProducts: vendorProductsReducer,
  vendorProduct: vendorProductReducer,
  vendorProductDetails: vendorProductDetailsReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  user: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
