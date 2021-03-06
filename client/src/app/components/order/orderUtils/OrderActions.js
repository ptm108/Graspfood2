import { SubmissionError, reset, dispatch } from "redux-form";
import axios from "axios";
import {
  FETCH_ORDERS,
  RESET_ORDERS,
  FETCH_ORDER_DETAILS,
  GET_RIDER_CURR_ORDER,
} from "./OrderConstants";
import { toastr } from "react-redux-toastr";
// import { toastr } from "react-redux-toastr";

export const fetchOrders = (uid) => {
  return async (dispatch, getState) => {
    await axios.get("/api/get/orderList", { params: uid }).then((res) => {
      if (res.data.rows) {
        console.log(res.data.rows);
        dispatch({ type: FETCH_ORDERS, payload: res.data.rows });
        return res.data.rows;
      }
    });
  };
};

export const resetOrders = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_ORDERS, payload: [] });
  };
};

export const fetchOrderDetails = (oid) => {
  return async (dispatch, getState) => {
    await axios.get("/api/get/orderDetails", { params: oid }).then((res) => {
      console.log(res);
      dispatch({ type: FETCH_ORDER_DETAILS, payload: res.data });
    });
  };
};

export const createReview = (review) => {
  console.log(review);
  return async (dispatch, getState) => {
    await axios.post("/api/post/createReview", review).then((res) => {
      console.log(res);
      if (res.data.status === "SUCCESS") {
        toastr.success("Success", "Review left!");
      } else {
        toastr.error("Opps", "Something went wrong");
      }
    });
  };
};

export const putRiderReview = (review) => {
  console.log(review);
  return async (dispatch, getState) => {
    await axios.put("/api/put/putRiderReview", review).then((res) => {
      console.log(res);
      if (res.data.status === "SUCCESS") {
        toastr.success("Success", "Rider Review left!");
      } else {
        toastr.error("Opps", "Something went wrong");
      }
    });
  };
};

export const getOrderDetailsByDrid = (drid) => {
  console.log(drid);
  return async (dispatch, getState) => {
    await axios
      .get("/api/get/getCurrentOrderByDrid", { params: drid })
      .then((res) => {
        console.log(res);
        dispatch({ type: GET_RIDER_CURR_ORDER, payload: res.data})
      });
  };
};
