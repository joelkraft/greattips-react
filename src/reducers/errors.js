import { ADD_ERROR, REMOVE_ERROR } from '../actiontypes/errors'

const removeDuplicate = (state, err) =>
  state.filter(existingError => existingError.message !== err.message)

export default function tips (state = [], action) {
  switch (action.type) {
    case ADD_ERROR:
      return [...removeDuplicate(state, action.err), action.err]
    case REMOVE_ERROR:
      return [...state.filter(err => err.id !== action.id)]
    default:
      return state
  }
}
