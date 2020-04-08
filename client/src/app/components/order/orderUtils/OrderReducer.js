import { createReducer } from "../../../reduxstore/reducerUtil";
import { FETCH_ORDERS, RESET_ORDERS, FETCH_ORDER_DETAILS } from "./OrderConstants"

const initialState = {
  orders: []
};

const fetchOrders = (state, payload) => {
  //console.log(payload);
  return {
    ...state,
    orders: payload
  };
};

const resetOrders = (state, payload) => {
  //console.log(payload);
  return {
    ...state,
    orders: []
  };
};

const fetchOrdersDetails = (state, payload) => {
  // console.log(payload);
  return {
    ...state,
    currentOrder: payload
  };
};

export default createReducer(initialState, {
  [FETCH_ORDERS]: fetchOrders,
  [RESET_ORDERS]: resetOrders,
  [FETCH_ORDER_DETAILS]: fetchOrdersDetails
});
