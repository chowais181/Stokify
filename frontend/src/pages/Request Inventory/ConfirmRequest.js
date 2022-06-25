import React, { Fragment, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Page from "../../components/Page";
import "./ConfirmRequest.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Loader from "../../components/Loader/Loader";
import emailjs from "@emailjs/browser";
import {
  createReqInventory,
  clearErrors,
} from "../../actions/reqInventoryAction";
import { useAlert } from "react-alert";

///////////////////////////////
const ConfirmRequest = ({ history }) => {
  let TotalQuantity = 0;
  const form = useRef();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newReqInventory);
  let dept = " ";
  dept = cartItems && cartItems[0].department;
  const order = {
    department: dept,
    orderItems: cartItems,
  };

  const proceed = (e) => {
    e.preventDefault();
    dispatch(createReqInventory(order));

    ////////////////////////////////
    emailjs
      .sendForm(
        "service_546uk9a",
        "template_bjifoua",
        form.current,
        "YMs3ef2fvu8QUd8nC"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    ////////////////////////////////////
    navigate("/dashboard/requestinventory/success");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);
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
                <Typography> Summary</Typography>
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
                <form ref={form} onClick={proceed}>
                  <input
                    type="hidden"
                    name="user_name"
                    value={user && user.name}
                  />
                  <input
                    type="hidden"
                    name="user_email"
                    value={user && user.email}
                  />
                  <input
                    type="hidden"
                    name="message"
                    value={`| User ID:${user && user._id}|\n | Name:${
                      user && user.name
                    }| \n| Contact No:${
                      user && user.phoneNumber
                    } \n| Requested Items:${
                      cartItems && cartItems.length
                    }\n | Total Quantity:${TotalQuantity}\n | To see the details click on this link: \n http://localhost:3000/dashboard/requestlist`}
                  />
                  <button className="btnPro">
                    <b>Proceed </b>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ConfirmRequest;
