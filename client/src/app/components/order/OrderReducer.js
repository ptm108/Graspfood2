import { createReducer } from "../../reduxstore/reducerUtil";
// import { CREATE_ORDER, DELETE_ORDER, FETCH_ORDER, FETCH_USER_ORDERS} from "./OrderConstants";
import {FETCH_ORDER} from "./OrderConstants";

const initialState = {
    orders: []
  };

  
  const fetchOrders = (state, payload) => {
    console.log(payload);
    return {
      orders: payload
    };
  };
  
  export default createReducer(initialState, {
    [FETCH_ORDER]: fetchOrders
  });

export default createReducer(initialState, {
    // [CREATE_ORDER]: createOrder,
    // [DELETE_ORDER]: deleteOrder,
    [FETCH_ORDER]: fetchOrder
    // [FETCH_USER_ORDERS]: fetchUserOrders
  });