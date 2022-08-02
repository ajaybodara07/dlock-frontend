import { LIST_ITEMS } from "../actions/types";

const initialState = {
  items: [],
  loading: true,
};

export default function item(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LIST_ITEMS:
      return {
        ...state,
        items: payload,
        loading: false,
      };
    default:
      return state;
  }
}
