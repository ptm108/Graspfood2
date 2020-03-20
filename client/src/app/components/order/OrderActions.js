import { SubmissionError, reset, dispatch } from "redux-form";
import axios from "axios";
import { FETCH_ORDER } from "./OrderConstants";
// import { toastr } from "react-redux-toastr";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/api/get/orderList")
      .then(res => {
        if (res.data.rows) {
          console.log(res.data.rows);
          dispatch({ type: FETCH_ORDER, payload: res.data.rows});
          return res.data.rows;
        }
      })
  };
};