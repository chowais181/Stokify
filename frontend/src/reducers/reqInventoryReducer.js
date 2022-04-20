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
  UPDATE_INVENTORYORDER_RESET,
  DELETE_INVENTORYORDER_REQUEST,
  DELETE_INVENTORYORDER_SUCCESS,
  DELETE_INVENTORYORDER_FAIL,
  DELETE_INVENTORYORDER_RESET,
  INVENTORYORDER_DETAILS_REQUEST,
  INVENTORYORDER_DETAILS_SUCCESS,
  INVENTORYORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/reqInventoryConstants";

export const createReqInventoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_INVENTORYORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_INVENTORYORDER_SUCCESS:
      return {
        loading: false,
        request: action.payload,
      };

    case CREATE_INVENTORYORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myRequestsReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case MY_INVENTORYORDERS_REQUEST:
      return {
        loading: true,
      };

    case MY_INVENTORYORDERS_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      };

    case MY_INVENTORYORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allRequestReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case ALL_INVENTORYORDERS_REQUEST:
      return {
        loading: true,
      };

    case ALL_INVENTORYORDERS_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      };

    case ALL_INVENTORYORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const reqInventoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_INVENTORYORDER_REQUEST:
    case DELETE_INVENTORYORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_INVENTORYORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_INVENTORYORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_INVENTORYORDER_FAIL:
    case DELETE_INVENTORYORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_INVENTORYORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_INVENTORYORDER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const requestDetailsReducer = (state = { request: {} }, action) => {
  switch (action.type) {
    case INVENTORYORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case INVENTORYORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        request: action.payload,
      };

    case INVENTORYORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
