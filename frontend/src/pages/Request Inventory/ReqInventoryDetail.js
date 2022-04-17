import React, { Fragment, useEffect } from "react";
import "./ReqInventoryDetail.css";
import { useSelector, useDispatch } from "react-redux";
import Page from "../../components/Page";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {
  getRequestDetails,
  clearErrors,
  updateRequest,
} from "../../actions/reqInventoryAction";
import Loader from "../../components/Loader/Loader";
import { useAlert } from "react-alert";

const ReqInventoryDetail = () => {
  const { id } = useParams();
  const { order, error, loading } = useSelector(
    (state) => state.reqInventoryDetails
  );

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getRequestDetails(id));
    dispatch(updateRequest(id, "Accepted"));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Page title="Request Inventory Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Request ID #{order && order._id}
              </Typography>
              <Typography>User Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{order.user && order.user.phoneNumber}</span>
                </div>
                <div></div>
              </div>

              <Typography>Request Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order &&
                      order.requestStatus &&
                      order.requestStatus === "Accepted"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order && order.requestStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Requested Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.name}>
                      <p>{item.name} = </p>

                      <p>{item.quantity}</p>
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

export default ReqInventoryDetail;
