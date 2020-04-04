import { createReducer } from "../../../reduxstore/reducerUtil";
import {
  FETCH_USER_CREDITCARD,
  RESET_CREDITCARD
} from "../customerUtils/customerConstants";

const initialState = {
  creditCard: null
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

export default createReducer(initialState, {
  [FETCH_USER_CREDITCARD]: fetchCreditCard,
  [RESET_CREDITCARD]: resetCreditCard
});
