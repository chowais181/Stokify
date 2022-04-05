import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import Page from "../../components/Page";
import "./ConfirmRequest.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Loader from "../../components/Loader/Loader";
const ConfirmRequest = ({ history }) => {
  let TotalQuantity = 0;

  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.user);

  const proceedToPayment = () => {
    // sessionStorage.setItem("requestInfo", JSON.stringify(data));
    navigate("/dashboard/success");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Page title="Confirm Request| Stokify" />
          <div className="confirmOrderPage">
            <div>
              <div className="confirmshippingArea">
                <Typography>Requested By</Typography>
                <div className="confirmshippingAreaBox">
                  <div>
                    <p>Name:</p>
                    <span>{user && user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{user && user.phoneNumber}</span>
                  </div>
                  <div>
                    <p>Email:</p>
                    <span>{user && user.email}</span>
                  </div>
                </div>
                <Typography>Category:</Typography>
                <div className="confirmCartItemsContainer">
                  <h4>{cartItems && cartItems[0].department}</h4>
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
                        <span value={(TotalQuantity += item.quantity)}>
                          {item.quantity}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/*  */}
            <div>
              <div className="orderSummary">
                <Typography> Summery</Typography>
                <div>
                  <div>
                    <p>Total Items:</p>
                    <span>{cartItems && cartItems.length}</span>
                  </div>
                  <div>
                    <p>Total Quantity:</p>
                    <span>{TotalQuantity}</span>
                  </div>
                  <div>
                    <p>Date: </p>
                    <span>{new Date().toLocaleString()}</span>
                  </div>
                </div>

                <div className="orderSummaryTotal">
                  <p>
                    <b> Click to Proceed the Request!</b>
                  </p>
                </div>

                <button onClick={proceedToPayment}>
                  <b>Proceed </b>
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ConfirmRequest;
