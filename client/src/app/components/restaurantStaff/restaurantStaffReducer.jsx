import { createReducer } from "../../reduxstore/reducerUtil";
import {
  FETCH_RESTAURANT_DETAILS,
  FETCH_TOTAL_ORDERS_AND_COST,
  FETCH_TOP_FIVE_FOOD,
  FETCH_PROMO_DETAILS,
} from "./restaurantStaffConstants";

const initialState = {
  restaurantDetails: null,
  totalOrdersDetails: null,
  topFiveFood: null,
  promoDetails: null,
};

export const fetchRestaurantDetails = (state, payload) => {
  return {
    ...state,
    restaurantDetails: payload,
  };
};

export const fetchRestaurantTotalOrdersAndCost = (state, payload) => {
  return {
    ...state,
    totalOrdersDetails: payload,
  };
};

export const fetchTopFiveFood = (state, payload) => {
  return {
    ...state,
    topFiveFood: payload,
  };
};

export const fetchPromoDetails = (state, payload) => {
  return {
    ...state,
    promoDetails: payload,
  };
};

export default createReducer(initialState, {
  [FETCH_RESTAURANT_DETAILS]: fetchRestaurantDetails,
  [FETCH_TOTAL_ORDERS_AND_COST]: fetchRestaurantTotalOrdersAndCost,
  [FETCH_TOP_FIVE_FOOD]: fetchTopFiveFood,
  [FETCH_PROMO_DETAILS]: fetchPromoDetails,
});
