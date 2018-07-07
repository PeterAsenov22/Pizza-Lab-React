import toastr from 'toastr'
const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)

function registerValidator (username, email, password, confirmPassword) {
  if (username.length < 4 || username === '') {
    toastr.error('Username must be at least 4 characters long')
    return false
  }
  if (!emailRegex.test(email) || email === '') {
    toastr.error('Please provide a correct email address')
    return false
  }
  if (password.length < 8 || password === '') {
    toastr.error('Password must be at least 8 characters long')
    return false
  }
  if (password !== confirmPassword) {
    toastr.error('Passwords do not match')
    return false
  }

  return true
}

export default registerValidator
