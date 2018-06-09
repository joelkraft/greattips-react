import {
  REQUEST_SAVE_USER_DATA,
  USER_DATA_WAS_SAVED,
  USER_DATA_WAS_NOT_SAVED,
  CHECK_LOGIN,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  REQUEST_CLEAR_USER,
  USER_WAS_CLEARED,
  USER_WAS_NOT_CLEARED,
  TOGGLE_USER_MENU
} from '../actiontypes/profile'

const defaultState = {
  userData: {
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
    }
  },
  userMenuVisible: false,
  errors: []
}
export default function profile (state = defaultState, action) {
  switch (action.type) {
    case REQUEST_SAVE_USER_DATA:
      return {
        ...state,
        isSaving: true
      }
    case USER_DATA_WAS_SAVED:
      return {
        ...state,
        isSaving: false,
        userData: action.data
      }
    case USER_DATA_WAS_NOT_SAVED:
      return {
        ...state,
        isSaving: false
      }
    case CHECK_LOGIN:
      return {
        ...state,
        checkingLogin: true
      }
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        checkingLogin: false,
        userData: action.userData
      }
    case LOGIN_FAILED:
      return {
        ...state,
        checkingLogin: false,
        errors: [...state.errors, action.err]
      }
    case REQUEST_CLEAR_USER:
      return {
        ...state,
        isLoggingOff: true
      }
    case USER_WAS_CLEARED:
      return {
        ...state,
        userData: null,
        isLoggingOff: false
      }
    case USER_WAS_NOT_CLEARED:
      return {
        ...state,
        isLoggingOff: false
      }
    case TOGGLE_USER_MENU:
      return {
        ...state,
        userMenuVisible: !state.userMenuVisible
      }
    default:
      return state
  }
}
