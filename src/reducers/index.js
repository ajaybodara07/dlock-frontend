import { combineReducers } from "redux";
import auth from "./auth";
import item from "./item";
import user from "./user";
import site from "./site";
import toast from "./toast";

export default combineReducers({
  auth,
  item,
  user,
  site,
  toast,
});
