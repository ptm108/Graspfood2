import { createReducer } from "../../../reduxstore/reducerUtil";
import {
  FETCH_USER_DETAILS,
  FETCH_DELIVERS,
  RESET_STATE,
  FETCH_WORK_HOURS,
} from "./riderConstants";

const initialState = {
  userDetails: null,
  deliverOrders: null,
  workHours: null,
};

const fetchRiderDetails = (state, payload) => {
  //console.log(payload);
  return {
    ...state,
    userDetails: payload,
  };
};

const fetchDelivers = (state, payload) => {
  //console.log(payload);
  return {
    ...state,
    deliverOrders: payload,
  };
};

const fetchHours = (state, payload) => {
  //console.log(payload);
  return {
    ...state,
    workHours: payload,
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
  [FETCH_DELIVERS]: fetchDelivers,
  [RESET_STATE]: resetState,
  [FETCH_WORK_HOURS]: fetchHours,
});
