import { createReducer } from "../../../reduxstore/reducerUtil";
import {
  FETCH_ALL_CUSTOMERS,
  FETCH_ORDERS_BY_MONTH,
  FETCH_ORDERS_BY_CUSTOMER,
  FETCH_ALL_ORDERS,
  FETCH_ALL_RIDERS_DELIVERIES_INFO,
  FETCH_RIDER_HOURS,
  FETCH_ALL_RIDER_DETAILS,
} from "../fdsUtils/fdsConstants";

const initialState = {
  allCustomers: null,
  ordersByMonth: null,
  ordersByCustomer: null,
  allOrders: null,
  allRidersDeliveriesInfo: null,
  workHours: null,
  allRiderDetails: null,
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

export const fetchAllRidersDeliveriesInfo = (state, payload) => {
  return {
    ...state,
    allRidersDeliveriesInfo: payload,
  };
};

export const fetchWorkHours = (state, payload) => {
  return {
    ...state,
    workHours: payload,
  };
};

export const allRiderDetails = (state, payload) => {
  return {
    ...state,
    allRiderDetails: payload,
  };
};

export default createReducer(initialState, {
  [FETCH_ALL_CUSTOMERS]: fetchAllCustomers,
  [FETCH_ORDERS_BY_MONTH]: fetchOrdersByMonth,
  [FETCH_ORDERS_BY_CUSTOMER]: fetchOrdersByCustomer,
  [FETCH_ALL_ORDERS]: fetchAllOrders,
  [FETCH_ALL_RIDERS_DELIVERIES_INFO]: fetchAllRidersDeliveriesInfo,
  [FETCH_RIDER_HOURS]: fetchWorkHours,
  [FETCH_ALL_RIDER_DETAILS]: allRiderDetails,
});
