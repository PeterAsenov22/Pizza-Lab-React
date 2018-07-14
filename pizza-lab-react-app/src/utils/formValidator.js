const registerValidationFunc = (
  email,
  username,
  password,
  confirmPassword
) => {
  let validEmail = (() => {
    let mailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    let testMail = mailRegex.test(email)
    if (testMail && email !== '') {
      return true
    }
    return false
  })()

  let validUsername = (() => {
    if (username.length > 3 &&
      username !== '') {
      return true
    }
    return false
  })()

  let validPassword = (() => {
    if (
      password.length > 7 &&
      password !== ''
    ) {
      return true
    }
    return false
  })()

  let validConfirmPassword = (() => {
    if (
      confirmPassword.length > 7 &&
      confirmPassword !== '' &&
      confirmPassword === password
    ) {
      return true
    }
    return false
  })()

  return {
    validEmail,
    validUsername,
    validPassword,
    validConfirmPassword
  }
}

const loginValidationFunc = (email, password) => {
  let validEmail = (() => {
    let emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    let testMail = emailRegex.test(email)
    if (testMail && email !== '') {
      return true
    }
    return false
  })()

  let validPassword = (() => {
    if (
      password.length > 7 &&
      password !== ''
    ) {
      return true
    }
    return false
  })()

  return {
    validEmail,
    validPassword
  }
}

const createProductValidationFunc = (name, ingredients, description, image, weight, price) => {
  let validName = (() => {
    if (
      name.length > 2 &&
      name !== ''
    ) {
      return true
    }
    return false
  })()

  let validIngredients = (() => {
    if (
      ingredients.length > 2 &&
      ingredients.indexOf(', ') < 0 &&
      ingredients !== ''
    ) {
      return true
    }
    return false
  })()

  let validDescription = (() => {
    if (
      description.length > 10 &&
      description.length <= 200 &&
      description !== ''
    ) {
      return true
    }
    return false
  })()

  let validImage = (() => {
    if (
      (image.startsWith('https://') || image.startsWith('http://')) && image.length >= 14
    ) {
      return true
    }
    return false
  })()

  let validWeight = (() => {
    if (
      weight >= 250 &&
      weight <= 800 &&
      weight !== ''
    ) {
      return true
    }
    return false
  })()

  let validPrice = (() => {
    if (
      price > 0 &&
      price !== ''
    ) {
      return true
    }
    return false
  })()

  return {
    validName,
    validIngredients,
    validDescription,
    validImage,
    validWeight,
    validPrice
  }
}

export {
  registerValidationFunc,
  loginValidationFunc,
  createProductValidationFunc
}
