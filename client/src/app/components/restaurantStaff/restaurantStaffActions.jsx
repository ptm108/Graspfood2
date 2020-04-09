import axios from "axios";
import { FETCH_RESTAURANT_DETAILS } from "./restaurantStaffConstants";

export const fetchRestaurantDetails = (value) => {
  //console.log(value);
  return async (dispatch) => {
    await axios
      .get("/api/get/restaurantDetails", { params: value })
      .then((res) => {
        if (res.data.rows) {
          console.log(res.data.rows);
          dispatch({ type: FETCH_RESTAURANT_DETAILS, payload: res.data.rows });
          return res.data.rows;
        }
      });
  };
};
