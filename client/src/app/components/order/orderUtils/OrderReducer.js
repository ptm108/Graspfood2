import { createReducer } from "../../../reduxstore/reducerUtil";
import { FETCH_ORDERS, RESET_ORDERS, FETCH_ORDER_DETAILS, PUT_RIDER_REVIEW, GET_RIDER_CURR_ORDER } from "./OrderConstants"

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

const getRiderCurrOrder = (state, payload) => {
  // console.log(payload);
  return {
    ...state,
    riderCurrOrder: payload
  };
};

export default createReducer(initialState, {
  [FETCH_ORDERS]: fetchOrders,
  [RESET_ORDERS]: resetOrders,
  [FETCH_ORDER_DETAILS]: fetchOrdersDetails,
  [GET_RIDER_CURR_ORDER]: getRiderCurrOrder
});
