import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import Page from "../../../components/Page";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Loader from "../../../components/Loader/Loader";
const ConfirmOrder = ({ history }) => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = Math.round(subtotal * 0.18);

  const totalPrice = Math.round(subtotal + tax + shippingCharges);

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/dashboard/shipping/order/confirm/process/payment");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Page title="Confirm Order| Stokify" />
          <CheckoutSteps activeStep={1} />
          <div className="confirmOrderPage">
            <div>
              <div className="confirmshippingArea">
                <Typography>Shipping Info</Typography>
                <div className="confirmshippingAreaBox">
                  <div>
                    <p>Name:</p>
                    <span>{user && user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{shippingInfo && shippingInfo.phoneNo}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>{address}</span>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item.product}>
                        <Link
                          to={`/dashboard/requestinventory/inventoryitem/${item.department}/${item.product}`}
                        >
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X Rs: {item.price} ={" "}
                          <b>{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/*  */}
            <div>
              <div className="orderSummary">
                <Typography>Order Summery</Typography>
                <div>
                  <div>
                    <p>Subtotal:</p>
                    <span>{subtotal}</span>
                  </div>
                  <div>
                    <p>Shipping Charges:</p>
                    <span>{shippingCharges}</span>
                  </div>
                  <div>
                    <p>GST:</p>
                    <span>{tax}</span>
                  </div>
                </div>

                <div className="orderSummaryTotal">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>Rs: {totalPrice}</span>
                </div>

                <button onClick={proceedToPayment}>Proceed To Payment</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ConfirmOrder;
