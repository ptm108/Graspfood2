import { createStore, combineReducers, applyMiddleware } from "redux";
import testReducer from "../components/test/testReducer";
import authReducer from "../components/auth/authReducer";
import { reducer as FormReducer } from "redux-form";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reducer as ToastrReducer } from "react-redux-toastr";
import asyncReducer from "../async/asyncReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import restaurantReducer from "../components/restaurant/restaurantUtils/restaurantReducer";
import customerReducer from "../components/customer/customerUtils/customerReducer";

const rootReducer = combineReducers({
  test: testReducer,
  auth: authReducer,
  form: FormReducer,
  toastr: ToastrReducer,
  async: asyncReducer,
  restaurant: restaurantReducer,
  customer: customerReducer
});

const persistConfig = {
  key: "root",
  storage
};

export const configureStore = () => {
  const store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeWithDevTools(applyMiddleware(thunk))
  );

  const persistor = persistStore(store);
  return { persistor, store };
};
