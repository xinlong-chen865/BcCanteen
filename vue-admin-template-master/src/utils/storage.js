class Storage {
  getLocalStorage(field) {
    return localStorage.getItem(field) || ''
  }
  setLocalStorage(field, value) {
    localStorage.setItem(field, value)
  }
  removeLocalStorage(field) {
    localStorage.removeItem(field)
  }
}

export const storage = new Storage()
