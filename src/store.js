import { createStore, combineReducers } from "redux";
import EmployeeReducer from "./reducers/EmployeeReducer";
import RegisterReducer from "./reducers/RegisterReducer";

const allReducer = combineReducers({ EmployeeReducer, RegisterReducer });
const store = createStore(
  allReducer,

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
