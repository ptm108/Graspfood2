import { dispatch } from "redux-form";
import axios from "axios";
import {
  FETCH_RESTAURANTS,
  FETCH_FOOD_ITEMS,
  RETRIEVE_PROMO_CODES,
  RESET_FOOD_ITEMS,
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

export const retrievePromoCodes = (rid) => {
  console.log(typeof rid);
  return async (dispatch, getState) => {
    await axios
      .get("/api/get/retrievePromoCodes", { params: rid })
      .then((res) => {
        // console.log(res);
        if (res.data.rows) {
          // console.log(res.data.rows);
          dispatch({ type: RETRIEVE_PROMO_CODES, payload: res.data.rows });
          // return res.data.rows;
        }
      });
  };
};

export const createNewFoodItem = (foodItem) => {
  console.log(foodItem);
  return async (dispatch, getState) => {
    await axios.post("/api/post/createFoodItem", foodItem).then((res) => {
      console.log(res);
      if (res.data.status === "SUCCESS") {
        toastr.success("Yay", "Food item created");
      } else {
        toastr.error("Error", "Something went wrong");
      }
    });
  };
};

export const resetFoodItems = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_FOOD_ITEMS });
  };
};

export const deleteFoodItem = (fid) => {
  return async (dispatch, getState) => {
    console.log(fid);
    await axios
      .delete("/api/delete/deleteFoodItem", {params: {fid: fid}})
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          toastr.success("Success", "Food Item Deleted")
        } else {
          toastr.error("Error", "Something went wrong")
        }
      });
  };
};

export const createNewPromo = (promo) => {
  console.log(promo);
  return async (dispatch, getState) => {
    await axios.post("/api/post/createPromo", promo).then((res) => {
      console.log(res);
      if (res.data.status === "SUCCESS") {
        toastr.success("Yay", "Promo created");
      } else {
        toastr.error("Error", "Something went wrong");
      }
    });
  };
};

export const deletePromo = (pid) => {
  return async (dispatch, getState) => {
    console.log(pid);
    await axios
      .delete("/api/delete/deletePromo", {params: {pid: pid}})
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          toastr.success("Success", "Promo Deleted")
        } else {
          toastr.error("Error", "Something went wrong")
        }
      });
  };
};
