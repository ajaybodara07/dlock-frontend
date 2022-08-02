import axios from "axios";
import { AUTH_ERROR, LIST_ITEMS } from "./types";
import { setToast } from "./toast";
import store from "../store";

// List Items
export const listItems = () => async (dispatch) => {
  const organization = store.getState().auth.organization;
  const site = store.getState().auth.site;

  try {
    const res = await axios.get(
      `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/sites/${site}/items`
    );

    const listItems = res?.data?.data.items;

    dispatch({
      type: LIST_ITEMS,
      payload: listItems,
    });
  } catch (err) {
    if (err?.message === "Network Error") {
      dispatch(setToast("error", "Not authenticated"));

      // dispatch({
      //   type: AUTH_ERROR,
      // });
    }
  }
};
