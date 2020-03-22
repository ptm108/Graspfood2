import axios from "axios";
import { FETCH_REVIEWS } from "./ReviewConstants";

/*export const createReview = review => {
    return async (dispatch, getState) => {
        await axios
    };
};*/

export const fetchReviews = () => {
    return async (dispatch, getState) => {
      await axios
        .get("/api/get/reviewList")
        .then(res => {
          if (res.data.rows) {
            console.log(res.data.rows);
            dispatch({ type: FETCH_REVIEWS, payload: res.data.rows});
            return res.data.rows;
          }
        })
    };
  };