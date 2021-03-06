import { createReducer } from "../../reduxstore/reducerUtil";
import { LOGIN_USER, SIGN_OUT_USER } from "./authConstants";

const initialState = {
  authenticated: false,
  currentUser: null,
  userAccessRight: 0
};

const login = (state, payload) => {
  console.log(payload);
  return {
    authenticated: true,
    currentUser: payload,
    userAccessRight: payload.accessright
  };
};

const signOutUser = () => {
  return {
    authenticated: false,
    currentUser: null,
    userAccessRight: null
  };
};

export default createReducer(initialState, {
  [LOGIN_USER]: login,
  [SIGN_OUT_USER]: signOutUser
});
