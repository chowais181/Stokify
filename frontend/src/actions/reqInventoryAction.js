import {
  CREATE_INVENTORYORDER_REQUEST,
  CREATE_INVENTORYORDER_SUCCESS,
  CREATE_INVENTORYORDER_FAIL,
  MY_INVENTORYORDERS_REQUEST,
  MY_INVENTORYORDERS_SUCCESS,
  MY_INVENTORYORDERS_FAIL,
  ALL_INVENTORYORDERS_REQUEST,
  ALL_INVENTORYORDERS_SUCCESS,
  ALL_INVENTORYORDERS_FAIL,
  UPDATE_INVENTORYORDER_REQUEST,
  UPDATE_INVENTORYORDER_SUCCESS,
  UPDATE_INVENTORYORDER_FAIL,
  DELETE_INVENTORYORDER_REQUEST,
  DELETE_INVENTORYORDER_SUCCESS,
  DELETE_INVENTORYORDER_FAIL,
  INVENTORYORDER_DETAILS_REQUEST,
  INVENTORYORDER_DETAILS_SUCCESS,
  INVENTORYORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/reqInventoryConstants";

import axios from "axios";

// Create Order
export const createReqInventory = (request) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_INVENTORYORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/reqInventory/new",
      request,
      config
    );

    dispatch({ type: CREATE_INVENTORYORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_INVENTORYORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myRequests = () => async (dispatch) => {
  try {
    dispatch({ type: MY_INVENTORYORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/requests/me");

    dispatch({ type: MY_INVENTORYORDERS_SUCCESS, payload: data.request });
  } catch (error) {
    dispatch({
      type: MY_INVENTORYORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Orders (admin)
export const getAllRequest = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_INVENTORYORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/requests");

    dispatch({ type: ALL_INVENTORYORDERS_SUCCESS, payload: data.request });
  } catch (error) {
    dispatch({
      type: ALL_INVENTORYORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateRequest =
  (id, requestStatus, returnDate) => async (dispatch) => {
    
    try {
      dispatch({ type: UPDATE_INVENTORYORDER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/request/${id}`,
        {
          requestStatus,
          returnDate,
        },
        config
      );

      dispatch({ type: UPDATE_INVENTORYORDER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_INVENTORYORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete Order
export const deleteRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_INVENTORYORDER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/request/${id}`);

    dispatch({ type: DELETE_INVENTORYORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_INVENTORYORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Order Details
export const getRequestDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: INVENTORYORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/reqInventory/${id}`);

    dispatch({ type: INVENTORYORDER_DETAILS_SUCCESS, payload: data.request });
  } catch (error) {
    dispatch({
      type: INVENTORYORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
