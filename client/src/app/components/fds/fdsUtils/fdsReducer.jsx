import { createReducer } from "../../../reduxstore/reducerUtil";
import {
  FETCH_ALL_CUSTOMERS,
  FETCH_ORDERS_BY_MONTH,
  FETCH_ORDERS_BY_CUSTOMER,
  FETCH_ALL_ORDERS,
} from "../fdsUtils/fdsConstants";

const initialState = {
  allCustomers: null,
  ordersByMonth: null,
  ordersByCustomer: null,
  allOrders: null,
};

export const fetchAllCustomers = (state, payload) => {
  return {
    ...state,
    allCustomers: payload,
  };
};

export const fetchOrdersByMonth = (state, payload) => {
  return {
    ...state,
    ordersByMonth: payload,
  };
};

export const fetchOrdersByCustomer = (state, payload) => {
  return {
    ...state,
    ordersByCustomer: payload,
  };
};

export const fetchAllOrders = (state, payload) => {
  return {
    ...state,
    allOrders: payload,
  };
};

export default createReducer(initialState, {
  [FETCH_ALL_CUSTOMERS]: fetchAllCustomers,
  [FETCH_ORDERS_BY_MONTH]: fetchOrdersByMonth,
  [FETCH_ORDERS_BY_CUSTOMER]: fetchOrdersByCustomer,
  [FETCH_ALL_ORDERS]: fetchAllOrders,
});
