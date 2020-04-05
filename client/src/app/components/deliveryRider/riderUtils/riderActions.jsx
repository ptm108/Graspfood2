import axios from "axios";
import { toastr } from "react-redux-toastr";
import {
  FETCH_USER_DETAILS,
  FETCH_SALARY,
  FETCH_DELIVERS,
} from "./riderConstants";

export const fetchRiderDetails = (values) => {
  console.log(values);
  return async (dispatch) => {
    await axios.get("/api/get/riderDetails", { params: values }).then((res) => {
      console.log(res.data);
      if (res.data.rows) {
        dispatch({ type: FETCH_USER_DETAILS, payload: res.data.rows });
        return res.data.rows;
      }
    });
  };
};

export const fetchSalary = (values) => {
  console.log(values);
  return async (dispatch) => {
    await axios.get("/api/get/riderSalary", { params: values }).then((res) => {
      console.log(res.data.rows[0]);
      if (res.data.rows) {
        dispatch({ type: FETCH_SALARY, payload: res.data.rows });
        return res.data.rows;
      }
    });
  };
};

export const fetchDeliverOrders = (values) => {
  console.log(values);
  return async (dispatch) => {
    await axios
      .get("/api/get/deliverOrders", { params: values })
      .then((res) => {
        //console.log(res.data.rows);
        if (res.data.rows) {
          dispatch({ type: FETCH_DELIVERS, payload: res.data.rows });
          return res.data.rows;
        }
      });
  };
};
