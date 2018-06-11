import { ADD_ERROR, REMOVE_ERROR } from '../actiontypes/errors'

const nextErrorId = (() => {
  let nextId = 0
  return () => nextId++
})()

export function sendError (err) {
  return function (dispatch) {
    dispatch(addError({ message: err.message, id: nextErrorId() }))
  }
}

export function addError (err) {
  return {
    type: ADD_ERROR,
    err
  }
}

export function removeError (id) {
  return {
    type: REMOVE_ERROR,
    id
  }
}
