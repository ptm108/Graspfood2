import axios from "axios";
import {
  FETCH_ALL_CUSTOMERS,
  FETCH_ORDERS_BY_MONTH,
  FETCH_ORDERS_BY_CUSTOMER,
  FETCH_ALL_ORDERS,
  FETCH_ALL_RIDERS_DELIVERIES_INFO,
  FETCH_RIDER_HOURS,
  FETCH_ALL_RIDER_DETAILS,
  RESET_STATE,
} from "../fdsUtils/fdsConstants";

export const fetchAllCustomers = () => {
  return async (dispatch) => {
    await axios.get("/api/get/allCustomers").then((res) => {
      console.log(res.data);
      if (res.data.rows) {
        dispatch({ type: FETCH_ALL_CUSTOMERS, payload: res.data.rows });
        return res.data.rows;
      }
    });
  };
};

export const fetchOrdersByMonth = () => {
  return async (dispatch) => {
    await axios.get("/api/get/ordersByMonth").then((res) => {
      console.log(res.data);
      if (res.data.rows) {
        dispatch({ type: FETCH_ORDERS_BY_MONTH, payload: res.data.rows });
        return res.data.rows;
      }
    });
  };
};

export const fetchOrdersByCustomer = () => {
  return async (dispatch) => {
    await axios.get("/api/get/ordersByCustomer").then((res) => {
      console.log(res.data);
      if (res.data.rows) {
        dispatch({ type: FETCH_ORDERS_BY_CUSTOMER, payload: res.data.rows });
        return res.data.rows;
      }
    });
  };
};

export const fetchAllOrders = () => {
  return async (dispatch) => {
    await axios.get("/api/get/allOrders").then((res) => {
      console.log(res.data);
      if (res.data.rows) {
        dispatch({ type: FETCH_ALL_ORDERS, payload: res.data.rows });
        return res.data.rows;
      }
    });
  };
};

export const fetchAllRidersDeliveriesInfo = () => {
  return async (dispatch) => {
    await axios.get("/api/get/allRiderDeliveriesInfo").then((res) => {
      console.log(res.data);
      if (res.data.rows) {
        dispatch({
          type: FETCH_ALL_RIDERS_DELIVERIES_INFO,
          payload: res.data.rows,
        });
        return res.data.rows;
      }
    });
  };
};

export const fetchWorkHours = () => {
  return async (dispatch) => {
    await axios.get("/api/get/allRiderWorkHours").then((res) => {
      console.log(res.data);
      if (res.data.rows) {
        dispatch({
          type: FETCH_RIDER_HOURS,
          payload: res.data.rows,
        });
        return res.data.rows;
      }
    });
  };
};

export const fetchAllRiderDetails = () => {
  return async (dispatch) => {
    await axios.get("/api/get/allRiderDetails").then((res) => {
      console.log(res.data);
      if (res.data.rows) {
        dispatch({
          type: FETCH_ALL_RIDER_DETAILS,
          payload: res.data.rows,
        });
        return res.data.rows;
      }
    });
  };
};

export const resetState = () => {
  return async (dispatch) => {
    dispatch({ type: RESET_STATE });
  };
};
