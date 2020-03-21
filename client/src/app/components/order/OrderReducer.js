import { createReducer } from "../../reduxstore/reducerUtil";
import { FETCH_ORDERS } from "../order/OrderConstants"

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

export default createReducer(initialState, {
  [FETCH_ORDERS]: fetchOrders
});
