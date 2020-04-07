import { createReducer } from "../../../reduxstore/reducerUtil";
import {
  FETCH_NEW_CUSTOMERS,
  FETCH_ORDERS_BY_MONTH,
} from "../fdsUtils/fdsConstants";

const initialState = { newCustomers: null, ordersByMonth: null };

export const fetchNewCustomers = (state, payload) => {
  return {
    ...state,
    newCustomers: payload,
  };
};

export const fetchOrdersByMonth = (state, payload) => {
  return {
    ...state,
    ordersByMonth: payload,
  };
};

export default createReducer(initialState, {
  [FETCH_NEW_CUSTOMERS]: fetchNewCustomers,
  [FETCH_ORDERS_BY_MONTH]: fetchOrdersByMonth,
});
