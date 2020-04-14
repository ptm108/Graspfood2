import axios from "axios";
import { toastr } from "react-redux-toastr";
import {
  FETCH_USER_DETAILS,
  FETCH_DELIVERS,
  RESET_STATE,
  FETCH_WORK_HOURS,
  GET_CURR_WEEK_HOURS,
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

export const fetchHours = (value) => {
  return async (dispatch) => {
    await axios
      .get("/api/get/weeklyWorkHours", { params: value })
      .then((res) => {
        if (res.data.rows) {
          dispatch({ type: FETCH_WORK_HOURS, payload: res.data.rows });
          return res.data.rows;
        }
      });
  };
};

export const resetState = () => {
  return async (dispatch) => {
    dispatch({ type: RESET_STATE });
  };
};

export const setArriveAtRestaurant = (oid) => {
  console.log(oid);
  return async (dispatch, getState) => {
    await axios
      .put("/api/put/updateDeliversArriveRestaurant", { params: oid })
      .then((res) => {
        console.log(res);
      });
  };
};

export const setLeftRestaurant = (oid) => {
  console.log(oid);
  return async (dispatch, getState) => {
    await axios
      .put("/api/put/updateDeliversLeftRestaurant", { params: oid })
      .then((res) => {
        console.log(res);
      });
  };
};

export const setDeliveredTime = (oid) => {
  console.log(oid);
  return async (dispatch, getState) => {
    await axios
      .put("/api/put/updateDeliveredTime", { params: oid })
      .then((res) => {
        console.log(res);
      });
  };
};

export const getDeliveryRiderSchedule = (uid) => {
  return async (dispatch, getState) => {
    await axios
      .get("/api/get/getDRSchedule", { params: { uid: uid } })
      .then((res) => {
        dispatch({ type: GET_CURR_WEEK_HOURS, payload: res.data.rows });
      });
  };
};

export const addDeliveryRiderSchedule = (schedule) => {
  return async (dispatch, getState) => {
    await axios.post("/api/post/addDRSchedule", schedule).then((res) => {
      console.log(res);
      if (res.data.status === "SUCCESS") {
        toastr.success("Success", "Schedule updated");
      } else {
        toastr.error("Error", "Conflict in schedule");
      }
    });
  };
};

export const deleteDeliveryRiderSchedule = (schedule) => {
  console.log(schedule);
  return async (dispatch, getState) => {
    await axios
      .delete("/api/post/deleteDRSchedule", { params: schedule })
      .then((res) => {
        console.log(res);
        if (res.data.status === "SUCCESS") {
          toastr.success("Success", "Schedule updated");
        } else {
          toastr.error("Error", "Conflict in schedule");
        }
      });
  };
};
