import { dispatch } from "redux-form";
import axios from "axios";
import {
  FETCH_RESTAURANTS,
  FETCH_FOOD_ITEMS,
  RETRIEVE_PROMO_CODES,
} from "./restaurantConstants";
import { toastr } from "react-redux-toastr";

export const fetchRestaurants = () => {
  return async (dispatch, getState) => {
    await axios.get("/api/get/restaurantList").then((res) => {
      if (res.data.rows) {
        // console.log(res.data.rows);
        dispatch({ type: FETCH_RESTAURANTS, payload: res.data.rows });
        return res.data.rows;
      }
    });
  };
};

export const retrievePromoCodes = (rid) => {
  console.log(rid);
  return async (dispatch, getState) => {
    await axios
      .get("/api/get/getPromotions")
      .then((res) => {
        console.log(res);
        if (res.data.rows) {
          dispatch({ type: RETRIEVE_PROMO_CODES, payload: res.data.rows });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchFoodItemsByRid = (restaurant) => {
  return async (dispatch, getState) => {
    await axios
      .get("/api/get/fetchFoodItemsByRid", { params: restaurant })
      .then((res) => {
        // console.log(res);
        if (res.data.rows) {
          // console.log(res.data.rows);
          dispatch({ type: FETCH_FOOD_ITEMS, payload: res.data.rows });
          return res.data.rows;
        }
      });
  };
};

export const postNewOrder = (order) => {
  console.log(order);
  return async (dispatch, getState) => {
    await axios.post("/api/post/postNewOrder", order).then((res) => {
      console.log(res);
      if (res.data.status === "SUCCESS") {
        toastr.success(
          "Order " + res.data.oid + " created",
          "Delivering by " + res.data.dr.drname
        );
      } else {
        toastr.error("Oops", res.data.msg);
      }
    });
  };
};
