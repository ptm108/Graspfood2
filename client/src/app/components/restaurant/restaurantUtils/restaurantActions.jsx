import { SubmissionError, reset, dispatch } from "redux-form";
import axios from "axios";
import { FETCH_RESTAURANTS } from "./restaurantConstants";

export const fetchRestaurants = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/api/get/restaurantList")
      .then(res => {
        if (res.data.rows) {
          console.log(res.data.rows);
          dispatch({ type: FETCH_RESTAURANTS, payload: res.data.rows});
          return res.data.rows;
        }
      })
  };
};
