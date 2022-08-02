import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types'

import { setToast } from './toast'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

// Load User
export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem('token')
  setAuthToken(token)

  try {
    dispatch({
      type: USER_LOADED,
      payload: jwt_decode(token),
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
    console.log(err)
    if (err.message === 'Invalid token specified') {
      dispatch(setToast('error', 'Not authenticated kkk'))
    }
  }
}

// Register user
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ name, email, password })
    try {
      const res = await axios.post('/api/users', body, config)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
      dispatch(loadUser())
    } catch (err) {
      console.log(err)
      dispatch(setToast('error', 'Error occured Sign Up'))
      throw err
    }
  }

// Login user
export const login = (username, password) => async (dispatch) => {
  try {
    const res = await axios.post(
      `https://8ntjk73592.execute-api.eu-west-1.amazonaws.com/prod/session?username=${username}&password=${password}`
    )
    console.log({ data: res.data })
    const token = res.data.data.item.token

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token },
    })

    dispatch(loadUser())
    dispatch(setToast('success', 'Successfully logged in'))
  } catch (err) {
    console.log('login err')
    console.log(err)
    if (err.message) {
      dispatch(setToast('error', err.message))
    }
    dispatch({
      type: LOGIN_FAIL,
    })
    throw err
  }
}

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  })
}
