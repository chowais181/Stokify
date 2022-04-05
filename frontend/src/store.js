import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
  newProductReducer,
} from "./reducers/productReducer";
import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  createReqInventoryReducer,
  myRequestsReducer,
  allRequestReducer,
  requestDetailsReducer,
  reqInventoryReducer,
} from "./reducers/reqInventoryReducer";

const reducer = combineReducers({
  newProduct: newProductReducer,
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newReqInventory: createReqInventoryReducer,
  myRequests: myRequestsReducer,
  reqInventory: reqInventoryReducer,
  allRequest: allRequestReducer,
  reqInventoryDetails: requestDetailsReducer,
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
