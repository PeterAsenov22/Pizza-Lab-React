module.exports = {
  handleMongooseError: (err) => {
    let key = Object.keys(err.errors)[0]
    let message = err.errors[key].message
    return message
  }
}
