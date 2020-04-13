import { createReducer } from "../../../reduxstore/reducerUtil";
import {
  FETCH_RESTAURANTS,
  FETCH_FOOD_ITEMS,
  RESET_FOOD_ITEMS,
  POST_NEW_ORDER,
  RETRIEVE_PROMO_CODES
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
    fooditems: null,
    promoCodes: null
  }
}

const postNewOrder = (state, payload) => {
  console.log(payload);
  return {
    ...state
  };
};

const retrievePromo = (state, payload) => {
  // console.log(payload);
  return {
    ...state,
    promoCodes: payload
  }
}

export default createReducer(initialState, {
  [FETCH_RESTAURANTS]: fetchRestaurants,
  [FETCH_FOOD_ITEMS]: fetchFoodItemsByRid,
  [RESET_FOOD_ITEMS]: resetFoodItems,
  [POST_NEW_ORDER]: postNewOrder,
  [RETRIEVE_PROMO_CODES]: retrievePromo
});
