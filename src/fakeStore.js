import {
  saveUserDataToLocalStorage,
  addUserDataToLocalStorage
} from './localStorage'

const storedUsers = [
  {
    name: 'Joel Kraft',
    email: 'joel@kraft.org',
    password: 'secret',
    id: 0
  }
]

const removeKeys = (keysToRemove = []) => (user = {}) => {
  return Object.keys(user).reduce(
    (newObj, key) =>
      (keysToRemove.indexOf(key) > -1
        ? newObj
        : { ...newObj, [key]: user[key] }),
    {}
  )
}

const removePassword = removeKeys(['password'])

export const store = {
  saveUser: user => {
    const id = storedUsers[storedUsers.length - 1].id + 1
    const userWithId = { ...user, id }
    storedUsers.push(userWithId)
    addUserDataToLocalStorage(userWithId)
    return removePassword(userWithId)
  },
  getUser: ({ email, password }) => {
    const user = removePassword(
      storedUsers.find(
        user => user.password === password && user.email === email
      )
    )
    return user.email ? user : null
  },
  updateUser: update => {
    const updatedStore = storedUsers.map(
      user => (update.id === user.id ? { ...user, ...update } : user)
    )
    const updatedUser = updatedStore.find(user => user.id === update.id)
    saveUserDataToLocalStorage(updatedUser)
    return removePassword(updatedUser)
  },
  init: () => removePassword(storedUsers[0])
}
