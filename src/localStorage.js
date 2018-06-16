export const loadData = namespace => {
  try {
    const serializedState = localStorage.getItem(namespace)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveData = (namespace, data) => {
  try {
    const serializedState = JSON.stringify(data)
    localStorage.setItem(namespace, serializedState)
  } catch (err) {
    // Ignore write errors.
  }
}

// TODO: remove this dummy user object
export const saveUserDataToLocalStorage = data => {
  let userData = loadData('users')
  if (userData) {
    userData = [...userData.filter(user => user.id !== data.id), data]
  } else {
    userData = [data]
  }
  saveData('users', userData)
}

export const addUserDataToLocalStorage = data => {
  let userData = loadData('users')
  if (userData) {
    userData = [...userData, data]
  } else {
    userData = [data]
  }
  saveData('users', userData)
}
