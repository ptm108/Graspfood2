import { SubmissionError, reset } from "redux-form";
import { toastr } from "react-redux-toastr";
import axios from "axios";

// login actions for staff, customer, delivery rider, restaurant manager

export const login = creds => {
  return async (dispatch, getState) => {
    await axios
      .get("/api/get/loginUser", creds)
      .then(data => {
        console.log(data);
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
    await axios
      .get("/api/post/registerUser", creds)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        throw new SubmissionError({
          _error: error.message
        });
      });
  };
};

// update profiles

export const updateProfile = user => {
  return async (dispatch, getState) => {
    await axios
      .get("/api/get/updateUser", creds)
      .then(data => {
        console.log(data);
        await dispatch(reset("account"));
        toastr.success("Success", "Your account has been updated")
      })
      .catch(error => {
        throw new SubmissionError({
          _error: error.message
        });
      });
  };
};
