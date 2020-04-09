import axios from "axios";
import {
  FETCH_RESTAURANT_DETAILS,
  FETCH_TOTAL_ORDERS_AND_COST,
  FETCH_TOP_FIVE_FOOD,
} from "./restaurantStaffConstants";

export const fetchRestaurantDetails = (value) => {
  //console.log(value);
  return async (dispatch) => {
    await axios
      .get("/api/get/restaurantDetails", { params: value })
      .then((res) => {
        if (res.data.rows) {
          //console.log(res.data.rows);
          dispatch({ type: FETCH_RESTAURANT_DETAILS, payload: res.data.rows });
          return res.data.rows;
        }
      });
  };
};

export const fetchRestaurantTotalOrdersAndCost = (value) => {
  return async (dispatch) => {
    await axios
      .get("/api/get/totalOrdersAndCost", { params: value })
      .then((res) => {
        if (res.data.rows) {
          //console.log(res.data.rows);
          dispatch({
            type: FETCH_TOTAL_ORDERS_AND_COST,
            payload: res.data.rows,
          });
          return res.data.rows;
        }
      });
  };
};

export const fetchTopFiveFood = (value) => {
  return async (dispatch) => {
    await axios.get("/api/get/topFiveFood", { params: value }).then((res) => {
      if (res.data.rows) {
        //console.log(res.data.rows);
        dispatch({
          type: FETCH_TOP_FIVE_FOOD,
          payload: res.data.rows,
        });
        return res.data.rows;
      }
    });
  };
};
