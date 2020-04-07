import axios from "axios";
import {
  FETCH_NEW_CUSTOMERS,
  FETCH_ORDERS_BY_MONTH,
} from "../fdsUtils/fdsConstants";

export const fetchNewCustomers = () => {
  return async (dispatch) => {
    await axios.get("/api/get/newCustomers").then((res) => {
      console.log(res.data);
      if (res.data.rows) {
        dispatch({ type: FETCH_NEW_CUSTOMERS, payload: res.data.rows });
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
