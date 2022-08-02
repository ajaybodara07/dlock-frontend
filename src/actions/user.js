import axios from "axios";
import { LIST_USERS, ADD_USER, EDIT_USER, DELETE_USER } from "./types";
import { setToast } from "./toast";
import store from "../store";
import { Auth } from "aws-amplify";

const payload = {
  deleteType: "delete",
};

// Load User
export const listUsers = () => async (dispatch) => {
  try {
    const organization = store.getState().auth.organization;

    const res = await axios.get(
      `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/users`
    );

    dispatch({
      type: LIST_USERS,
      payload: res.data.data.items,
    });
  } catch (err) {
    dispatch(setToast("error", err?.message || "Error occured"));
  }
};

// Add User
export const addUser =
  ({ userID, name, email, phoneNumber, password, role, siteID }) =>
  async (dispatch) => {
    const organization = store.getState().auth.organization;

    try {
      // await Auth.signUp({
      //   username: userID,
      //   password,
      //   attributes: {
      //     name,
      //     email,
      //     phone_number: phoneNumber,
      //     "custom:role": role,
      //     "custom:site_id": siteID,
      //   },
      //   clientMetadata: {
      //     organisation_id: organization,
      //   },
      // });

      const res = await axios.put(
        `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/users`,
        {
          targetUserID: userID,
          targetName: name,
          targetEmail: email,
          targetPassword: password,
          targetPhoneNumber: phoneNumber,
          targetRole: role,
          targetSiteID: siteID,
          targetOrganisationID: organization,
        }
      );

      const item = res.data.data.item;
      console.log(item);

      console.log("sign up item");

      dispatch({
        type: ADD_USER,
        payload: item,
      });
      dispatch(setToast("success", "User added"));
    } catch (err) {
      console.log(err);
      dispatch(setToast("error", err?.message || "Error occured"));
    }
  };

// Edit User
export const editUser =
  ({ userID, name, email, phoneNumber, password, role }) =>
  async (dispatch) => {
    const organization = store.getState().auth.organization;
    const site = store.getState().auth.site;

    console.log({
      userID,
      name,
      email,
      phoneNumber,
      password,
      role,
    });

    try {
      // const res = await axios.patch(
      //   `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/users/${userID}`,
      //   {
      //     name,
      //     phoneNumber,
      //   }
      // );
      // dispatch({
      //   type: EDIT_USER,
      //   payload: { userID, name, phoneNumber },
      // });
      // dispatch(setToast("success", "User updated"));
    } catch (err) {
      console.log(err);
      dispatch(setToast("error", "Error occured"));
    }
  };

export const deleteUser =
  ({ userID }) =>
  async (dispatch) => {
    const organization = store.getState().auth.organization;

    console.log({ userID });

    try {
      await axios.delete(
        `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/organisations/${organization}/users/${userID}`,
        {
          data: payload,
        }
      );

      dispatch({
        type: DELETE_USER,
        payload: { userID },
      });
      dispatch(setToast("success", "User deleted"));
    } catch (err) {
      console.log(err);
      dispatch(setToast("error", "Error occured"));
    }
  };
