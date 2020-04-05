import { createReducer } from "../../../reduxstore/reducerUtil";
import { FETCH_USER_DETAILS } from "./riderConstants";

const initialState = {
  userDetails: null
};

const fetchRiderDetails = (state, payload) => {
  console.log(payload);
  return {
    ...state,
    userDetails: payload
  };
};

export default createReducer(initialState, {
  [FETCH_USER_DETAILS]: fetchRiderDetails
});
