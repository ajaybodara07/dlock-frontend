import { SET_TOAST, REMOVE_TOAST } from "../actions/types";

const initialState = {
  open: false,
  type: "success",
  message: "Hello",
};

export default function toast(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TOAST:
      return {
        ...state,
        open: true,
        type: payload.type,
        message: payload.message,
      };
    case REMOVE_TOAST:
      return {
        ...state,
        open: false,
        type: "",
        message: "",
      };
    default:
      return state;
  }
}
