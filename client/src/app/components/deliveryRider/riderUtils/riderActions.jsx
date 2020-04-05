import axios from "axios";
import { toastr } from "react-redux-toastr";
import { FETCH_USER_DETAILS } from "./riderConstants";

export const fetchRiderDetails = values => {
  console.log(values);
  return async dispatch => {
    await axios.get("/api/get/riderDetails", { params: values }).then(res => {
      console.log(res.data);
      if (res.data.rows) {
        dispatch({ type: FETCH_USER_DETAILS, payload: res.data.rows });
        return res.data.rows;
      }
    });
  };
};
