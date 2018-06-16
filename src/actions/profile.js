import {
  REQUEST_SAVE_USER_DATA,
  USER_DATA_WAS_SAVED,
  USER_DATA_WAS_NOT_SAVED,
  CHECK_LOGIN,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  REQUEST_SIGNUP,
  SIGNUP_SUCCESSFUL,
  SIGNUP_UNSUCCESSFUL,
  REQUEST_CLEAR_USER,
  USER_WAS_CLEARED,
  USER_WAS_NOT_CLEARED,
  TOGGLE_USER_MENU
} from '../actiontypes/profile'

import { sendError } from './errors'
import { store } from '../fakeStore'

export function requestSaveUserData () {
  return {
    type: REQUEST_SAVE_USER_DATA
  }
}

export function userDataWasSaved (data) {
  return {
    type: USER_DATA_WAS_SAVED,
    data
  }
}

export function userDataWasNotSaved () {
  return {
    type: USER_DATA_WAS_NOT_SAVED
  }
}

export function saveUserData (data, token) {
  return function (dispatch) {
    dispatch(requestSaveUserData())
    // return fetch(`${apiUrl.root}/manifests/${id}`, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: authHeaderValue
    //     },
    //     body: JSON.stringify(item)
    // })
    return Promise.resolve({ json: () => data }) // TODO fakeout to remove when api hooked up
      .then(response => response.json())
      .then(store.updateUser)
      .then(data => dispatch(userDataWasSaved(data)))
      .catch(err => {
        dispatch(sendError(err))
        dispatch(userDataWasNotSaved())
      })
  }
}

export function checkLogin () {
  return {
    type: CHECK_LOGIN
  }
}

export function loginSucceeded (userData) {
  return {
    type: LOGIN_SUCCEEDED,
    userData
  }
}

export function loginFailed (err) {
  return {
    type: LOGIN_FAILED
  }
}

export function login (data, token) {
  return function (dispatch) {
    dispatch(checkLogin())
    // return fetch(`${apiUrl.root}/manifests/${id}`, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: authHeaderValue
    //     },
    //     body: JSON.stringify(item)
    // })
    Promise.resolve({ json: () => data }) // TODO fakeout to remove when api hooked up
      .then(response => response.json())
      .then(loginData => {
        console.log(loginData)
        const user = store.getUser(loginData)
        if (user) {
          return user
        }
        throw new Error('Username or password does not match.')
      })
      .then(data => dispatch(loginSucceeded(data)))
      .catch(err => {
        dispatch(sendError(err))
        dispatch(loginFailed())
      })
  }
}

export function requestSignup () {
  return {
    type: REQUEST_SIGNUP
  }
}

export function signupSuccessful (userData) {
  return {
    type: SIGNUP_SUCCESSFUL,
    userData
  }
}

export function signupUnuccessful () {
  return {
    type: SIGNUP_UNSUCCESSFUL
  }
}

export function signup (data, token) {
  return function (dispatch) {
    dispatch(requestSignup())
    // return fetch(`${apiUrl.root}/manifests/${id}`, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: authHeaderValue
    //     },
    //     body: JSON.stringify(item)
    // })
    Promise.resolve({ json: () => data }) // TODO fakeout to remove when api hooked up
      .then(response => response.json())
      .then(store.saveUser)
      .then(data => dispatch(signupSuccessful(data)))
      .catch(err => {
        dispatch(signupUnuccessful())
      })
  }
}

export function requestClearUser () {
  return {
    type: REQUEST_CLEAR_USER
  }
}

export function userWasCleared () {
  return {
    type: USER_WAS_CLEARED
  }
}

export function userWasNotCleared () {
  return {
    type: USER_WAS_NOT_CLEARED
  }
}

export function clearUser (token) {
  return function (dispatch) {
    dispatch(requestClearUser())
    // return fetch(`${apiUrl.root}/manifests/${id}`, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: authHeaderValue
    //     },
    //     body: JSON.stringify(item)
    // })
    Promise.resolve({ json: () => 'success' }) // TODO fakeout to remove when api hooked up
      .then(response => response.json())
      .then(data => dispatch(userWasCleared()))
      .catch(err => {
        dispatch(userWasNotCleared())
        throw err
      })
  }
}

export function toggleUserMenu () {
  return {
    type: TOGGLE_USER_MENU
  }
}
