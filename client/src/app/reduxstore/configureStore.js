import { createStore, combineReducers } from "redux";
import testReducer from "../components/test/testReducer";
import authReducer from "../components/auth/authReducer";
import { reducer as FormReducer } from "redux-form";

const rootReducer = combineReducers({
    test: testReducer,
    auth: authReducer,
    form: FormReducer
})

export const configureStore = () => {
    const store = createStore(rootReducer);
    return store;
}