const errorHandler = (json) => {
  let message = json.message
  if (json.errors) {
    let key = Object.keys(json.errors)[0]
    message = json.errors[key]
  }

  return message
}

export default errorHandler
