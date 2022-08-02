import { LIST_USERS, ADD_USER, EDIT_USER, DELETE_USER } from "../actions/types";

const initialState = {
  users: [],
  loading: true,
};

export default function user(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LIST_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        users: [payload, ...state.users],
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u?.userID !== payload.userID)
            return u;
        }),
        loading: false,
      };
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.userID === payload.userID) {
            return { ...u, ...payload };
          }
          return u;
        }),
        loading: false,
      };
    default:
      return state;
  }
}
