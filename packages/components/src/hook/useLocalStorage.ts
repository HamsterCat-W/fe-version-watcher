interface GetValueFunc {
  (): any
}

interface SetValueFunc {
  (newValue: any): void
}

interface VoidFunc {
  (): void
}

interface ReturnType {
  getValue: GetValueFunc
  setValue: SetValueFunc
  clearKey: VoidFunc
  clearAll: VoidFunc
}

export default (localKey: string): ReturnType => {
  /**
   * get
   */
  const getValue = (): any => {
    return localStorage.getItem(localKey) as any
  }

  /**
   * set
   * @param newValue
   */

  const setValue = (newValue: any): void => {
    localStorage.setItem(localKey, newValue)
  }

  /**
   * removeItem
   */

  const clearKey = (): void => {
    localStorage.removeItem(localKey)
  }

  /**
   * clear
   */

  const clearAll = (): void => {
    localStorage.clear()
  }

  return {
    getValue,
    setValue,
    clearKey,
    clearAll
  }
}
