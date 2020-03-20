import { createReducer } from "../../../reduxstore/reducerUtil";
import {
  FETCH_RESTAURANTS,
  FETCH_FOOD_ITEMS,
  RESET_FOOD_ITEMS
} from "../restaurantUtils/restaurantConstants";

const initialState = {
  restaurants: [],
  fooditems: []
};

const fetchRestaurants = (state, payload) => {
  //console.log(payload);
  return {
    ...state,
    restaurants: payload
  };
};

const fetchFoodItemsByRid = (state, payload) => {
  //console.log(payload);
  return {
    ...state,
    fooditems: payload
  };
};

const resetFoodItems = (state, payload) => {
  return {
    ...state,
    fooditems: null
  }
}

export default createReducer(initialState, {
  [FETCH_RESTAURANTS]: fetchRestaurants,
  [FETCH_FOOD_ITEMS]: fetchFoodItemsByRid,
  [RESET_FOOD_ITEMS]: resetFoodItems
});
