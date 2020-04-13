import { SubmissionError, reset, dispatch } from "redux-form";
import axios from "axios";
import { LOGIN_USER } from "./authConstants";
import { toastr } from "react-redux-toastr";

// login actions for staff, customer, delivery rider, restaurant manager

export const login = creds => {
  return async (dispatch, getState) => {
    //console.log(creds)
    await axios
      .get("/api/get/loginUser", { params: creds })
      .then(res => {
        if (res.data.rows) {
          console.log(res.data.rows);
          dispatch({ type: LOGIN_USER, payload: res.data.rows[0] });
          toastr.success("Success", "Logged in as " + creds.username);
        }
      })
      .catch(error => {
        throw new SubmissionError({
          _error: error.message
        });
      });
  };
};

// register account account details

export const register = user => {
  return async (dispatch, getState) => {
    console.log(user);
    await axios
      .post("/api/post/registerUser", user)
      .then(res => {
        console.log(typeof res.data);
        if ((typeof res.data) !== "string") {
          let newUser = JSON.parse(res.config.data);
          toastr.success("Success!", "Welcome, " + newUser.username);
        } else {
          toastr.error("Oops", res.data);
        }

        console.log(res);
      })
      .catch(error => {
        console.log(error);
        toastr.error("Error", error.message);
      });
  };
};

// update profiles

export const updateProfile = user => {
  return async (dispatch, getState) => {
    await axios
      .get("/api/get/updateUser", user)
      .then(data => {
        console.log(data);
        dispatch(reset("account"));
      })
      .catch(error => {
        throw new SubmissionError({
          _error: error.message
        });
      });
  };
};

export const changePassword = user => {
  console.log(user);
  return async dispatch => {
    await axios.put("/api/put/changePassword", user).then(res => {
      console.log(res.data);
      if (res.data.rowCount == 1) {
        toastr.success("Password has been changed successfully!");
      } else {
        toastr.error("Something went wrong");
      }
    });
  };
};
