import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import Page from "../../../components/Page";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../../actions/orderAction";
import Loader from "../../../components/Loader/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Page title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                <span style={{ "font-size": "30px" }}>
                  Order Id #{order && order._id}
                </span>
              </Typography>
              <Typography>Date</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>{order && order.createdAt}</p>
                </div>
              </div>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>
                    Name:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {order.user && order.user.name}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Phone:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Address:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </p>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>
                    Amount:{" "}
                    <span>Rs {order.totalPrice && order.totalPrice}</span>
                  </p>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <Link to="#">
                        <h2>{item.name}</h2>
                      </Link>
                      <span>
                        {item.quantity} X {item.price} ={" "}
                        <b>PKR : {item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
