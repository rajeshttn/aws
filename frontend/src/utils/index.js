export const checkValidity = (value, validation) => {
  let isValid = true
  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }
  if (validation.isNumeric) {
    const pattern = /^\d+$/
    isValid = pattern.test(value) && isValid
  }
  if (validation.isEmail) {
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/
    isValid = pattern.test(String(value).toLowerCase()) && isValid
  }
  return isValid
}

export const checkFormValidity = (fields) => {
  let isValid = true
  Object.keys(fields).forEach(key => {
    isValid = fields[key].valid && isValid
  })
  return isValid
}