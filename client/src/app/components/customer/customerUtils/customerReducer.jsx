import { createReducer } from "../../../reduxstore/reducerUtil";
import {
  FETCH_USER_CREDITCARD,
  RESET_STATE
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

export default createReducer(initialState, {
  [FETCH_USER_CREDITCARD]: fetchCreditCard
});
