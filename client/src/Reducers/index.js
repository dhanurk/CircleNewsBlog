import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import errorReducer from "./errorReducer.js";
import blogReducer from "./blogReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  blog: blogReducer
});
