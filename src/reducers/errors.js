import { ADD_ERROR, REMOVE_ERROR } from '../actiontypes/errors'

export default function tips (state = [], action) {
  switch (action.type) {
    case ADD_ERROR:
      return [...state, action.err]
    case REMOVE_ERROR:
      return [...state.filter(err => err.id !== action.id)]
    default:
      return state
  }
}
