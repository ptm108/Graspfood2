import { createReducer } from "../../reduxstore/reducerUtil";
import { FETCH_RESTAURANT_DETAILS } from "./restaurantStaffConstants";

const initialState = {
  restaurantDetails: null,
};

export const fetchRestaurantDetails = (state, payload) => {
  return {
    ...state,
    restaurantDetails: payload,
  };
};

export default createReducer(initialState, {
  [FETCH_RESTAURANT_DETAILS]: fetchRestaurantDetails,
});
