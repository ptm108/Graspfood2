import axios from "axios";
import {
  FETCH_USER_CREDITCARD,
  RESET_CREDITCARD
} from "../customerUtils/customerConstants";
import { toastr } from "react-redux-toastr";

export const fetchCreditCard = user => {
  console.log(user);
  return async (dispatch, getState) => {
    await axios.get("/api/get/creditcard", { params: user }).then(res => {
      if (res.data.rows) {
        //console.log(res.data.rows);
        dispatch({ type: FETCH_USER_CREDITCARD, payload: res.data.rows });
        return res.data.rows;
      }
    });
  };
};

export const resetCreditCard = () => {
  return async dispatch => {
    dispatch({ type: RESET_CREDITCARD });
  };
};

export const addCreditCard = values => {
  console.log(values);
  return async dispatch => {
    await axios
      .post("/api/post/addCreditCard", values)
      .then(res => {
        //console.log(res.data);
        if (res.data.length >= 0) {
          toastr.success("Credit Card added successfully!");
        } else {
          toastr.error("Oops! Something went wrong");
        }
      })
      .catch(error => {
        toastr.error("Oops! Something went wrong");
        console.log(error);
      });
  };
};

export const deleteCreditCard = values => {
  console.log(values);
  return async dispatch => {
    await axios
      .delete("/api/delete/deleteCreditCard", { data: values })
      .then(res => {
        console.log(res.data);
        if (res.data.rowCount >= 0) {
          toastr.success("Credit card deleted successfully!");
        } else {
          toastr.error("Oops! Something went wrong");
        }
      })
      .catch(error => {
        toastr.error("Oops! Something went wrong");
        console.log(error);
      });
  };
};
