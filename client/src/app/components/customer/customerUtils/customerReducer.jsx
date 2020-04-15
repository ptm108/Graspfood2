import { createReducer } from "../../../reduxstore/reducerUtil";
import {
  FETCH_USER_CREDITCARD,
  RESET_CREDITCARD,
  FETCH_USER_DETAILS,
  FETCH_REVIEWS,
} from "../customerUtils/customerConstants";

const initialState = {
  creditCard: null,
  userDetails: null,
  reviews: null,
};

const fetchCreditCard = (state, payload) => {
  console.log(payload);
  return {
    creditCard: payload,
  };
};

const resetCreditCard = (state) => {
  return {
    ...state,
    creditCard: null,
  };
};

const fetchCustomerDetails = (state, payload) => {
  console.log(payload);
  return {
    ...state,
    userDetails: payload,
  };
};

const fetchReviews = (state, payload) => {
  //console.log(payload);
  return {
    ...state,
    reviews: payload,
  };
};

export default createReducer(initialState, {
  [FETCH_USER_CREDITCARD]: fetchCreditCard,
  [RESET_CREDITCARD]: resetCreditCard,
  [FETCH_USER_DETAILS]: fetchCustomerDetails,
  [FETCH_REVIEWS]: fetchReviews,
});
