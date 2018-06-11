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
  TOGGLE_USER_MENU,
  REMOVE_ERROR
} from '../actiontypes/profile'

import { sendError, removeError } from './errors'
import { userTemplate } from '../templates'
import { saveData, loadData, saveUserDataToLocalStorage } from '../localStorage'

const nextErrorId = (() => {
  let nextId = 0
  return () => nextId++
})()

let users = loadData('users')

users = users || [
  {
    name: {
      label: 'Name',
      value: 'Joel Kraft'
    },
    email: {
      label: 'Email',
      value: 'joel@kraft.org'
    },
    avatar: {
      label: 'Gravatar',
      value: 'joel@kraft.org'
    },
    password: 'secret',
    id: 0
  }
]


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
    Promise.resolve({ json: () => data }) // TODO fakeout to remove when api hooked up
      .then(response => response.json())
      .then(data => {
        saveUserDataToLocalStorage(data)
        dispatch(userDataWasSaved(data))
      })
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
    type: LOGIN_FAILED,
    err
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
        const user = users.find(
          user =>
            user.email.value === loginData.email &&
            user.password === loginData.password
        )
        if (user) {
          let userData = { ...userTemplate, ...user }
          delete userData.password
          return userData
        }
        throw new Error('Username or password does not match.')
      })
      .then(data => dispatch(loginSucceeded(data)))
      .catch(err => {
        dispatch(sendError(err))
        dispatch()
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
      .then(signupData => {
        const userAlreadyExists = users.some(
          user => user.email === signupData.email
        )
        if (userAlreadyExists) {
          throw new Error('Signup was unsuccessful.')
        }
        let userData = {
          email: { label: 'Email', value: signupData.email },
          password: signupData.password
        }
        users.push({ ...userData })
        saveData('users', users)
        delete userData.password
        return userData
      })
      .then(data => dispatch(signupSuccessful(data)))
      .catch(err => {
        dispatch(signupUnuccessful({ message: err.message, id: nextErrorId() }))
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

export function removeError (id) {
  return {
    type: REMOVE_ERROR,
    id
  }
}
