import { SET_TOAST, REMOVE_TOAST } from "./types";

export const setToast = (type, message) => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: { type, message },
  });
};

export const removeToast = () => (dispatch) => {
  dispatch({
    type: REMOVE_TOAST,
  });
};
