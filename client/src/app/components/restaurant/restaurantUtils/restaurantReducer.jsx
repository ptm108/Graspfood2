import { createReducer } from "../../../reduxstore/reducerUtil";
import { FETCH_RESTAURANTS } from "../restaurantUtils/restaurantConstants"

const initialState = {
    restaurants: []
};

const fetchRestaurants = (state, payload) => {
  console.log(payload);
  return {
    restaurants: payload
  };
};

export default createReducer(initialState, {
  [FETCH_RESTAURANTS]: fetchRestaurants
});