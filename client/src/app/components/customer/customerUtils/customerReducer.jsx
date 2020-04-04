import { createReducer } from "../../../reduxstore/reducerUtil";
import {
  FETCH_USER_CREDITCARD,
  RESET_CREDITCARD,
  FETCH_USER_DETAILS
} from "../customerUtils/customerConstants";

const initialState = {
  creditCard: null,
  userDetails: null
};

const fetchCreditCard = (state, payload) => {
  console.log(payload);
  return {
    creditCard: payload
  };
};

const resetCreditCard = state => {
  return {
    ...state,
    creditCard: null
  };
};

const fetchUserDetails = (state, payload) => {
  console.log(payload);
  return {
    ...state,
    userDetails: payload
  };
};

export default createReducer(initialState, {
  [FETCH_USER_CREDITCARD]: fetchCreditCard,
  [RESET_CREDITCARD]: resetCreditCard,
  [FETCH_USER_DETAILS]: fetchUserDetails
});
