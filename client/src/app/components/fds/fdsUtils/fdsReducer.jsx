import { createReducer } from "../../../reduxstore/reducerUtil";
import { FETCH_NEW_CUSTOMERS } from "../fdsUtils/fdsConstants";

const initialState = { newCustomers: null };

export const fetchNewCustomers = (state, payload) => {
  return {
    ...state,
    newCustomers: payload,
  };
};

export default createReducer(initialState, {
  [FETCH_NEW_CUSTOMERS]: fetchNewCustomers,
});
