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
        data.password = userData.find(user => user.email.value === data.email.value).password
      userData = [
        ...userData.filter(user => user.email.value !== data.email.value),
        data
      ]
    } else {
      userData = [data]
    }
    saveData('users', userData)
  }