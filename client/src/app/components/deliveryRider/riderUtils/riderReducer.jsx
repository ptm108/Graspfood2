import { createReducer } from "../../../reduxstore/reducerUtil";
import {
  FETCH_USER_DETAILS,
  FETCH_SALARY,
  FETCH_DELIVERS,
  RESET_STATE,
} from "./riderConstants";

const initialState = {
  userDetails: null,
  salary: null,
  deliverOrders: null,
};

const fetchRiderDetails = (state, payload) => {
  //console.log(payload);
  return {
    ...state,
    userDetails: payload,
  };
};

const fetchSalary = (state, payload) => {
  //console.log(payload);
  return {
    ...state,
    salary: payload,
  };
};

const fetchDelivers = (state, payload) => {
  //console.log(payload);
  return {
    ...state,
    deliverOrders: payload,
  };
};

const resetState = (state) => {
  return {
    ...state,
    salary: null,
    deliverOrders: null,
  };
};

export default createReducer(initialState, {
  [FETCH_USER_DETAILS]: fetchRiderDetails,
  [FETCH_SALARY]: fetchSalary,
  [FETCH_DELIVERS]: fetchDelivers,
  [RESET_STATE]: resetState,
});
