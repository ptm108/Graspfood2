import { createStore, combineReducers, applyMiddleware } from "redux";
import testReducer from "../components/test/testReducer";
import authReducer from "../components/auth/authReducer";
import { reducer as FormReducer } from "redux-form";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { reducer as ToastrReducer } from "react-redux-toastr";
import asyncReducer from "../async/asyncReducer";

const rootReducer = combineReducers({
    test: testReducer,
    auth: authReducer,
    form: FormReducer,
    toastr: ToastrReducer,
    async: asyncReducer
})

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
        );
    return store;
}