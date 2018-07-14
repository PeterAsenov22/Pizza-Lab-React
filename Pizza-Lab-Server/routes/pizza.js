const express = require('express')
const authCheck = require('../config/auth-check')
const Pizza = require('../models/Pizza')

const router = new express.Router()

function validatePizzaCreateForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.weight = parseInt(payload.weight)
  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.name !== 'string' || payload.name.length < 3) {
    isFormValid = false
    errors.name = 'Pizza name must be at least 3 symbols.'
  }

  if (!payload || payload.ingredients.length < 3 || payload.ingredients.indexOf(', ') > -1 || payload.ingredients === '') {
    isFormValid = false
    errors.ingredients = 'Ingredients must be at least 3 characters long and separated by comma.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10 || payload.description.length > 200) {
    isFormValid = false
    errors.description = 'Description must be at least 10 symbols and less than 120 symbols.'
  }

  if (!payload || !payload.weight || payload.weight < 250 || payload.weight > 800) {
    isFormValid = false
    errors.year = 'Weight must be between 250 and 800 grams.'
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false
    errors.price = 'Price must be a positive number.'
  }

  if (!payload || typeof payload.image !== 'string' || !(payload.image.startsWith('https://') || payload.image.startsWith('http://')) || payload.image.length < 14) {
    isFormValid = false
    errors.image = 'Please enter valid Image URL. Image URL must be at least 14 symbols.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const pizzaObj = req.body
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validatePizzaCreateForm(pizzaObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    pizzaObj.ingredients = pizzaObj.ingredients.split(',').filter(i => i !== '')

    Pizza
      .create(pizzaObj)
      .then((createdPizza) => {
        res.status(200).json({
          success: true,
          message: 'Pizza added successfully.',
          data: createdPizza
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Pizza with the given name already exists.'
        }
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/edit/:id', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const pizzaId = req.params.id
    const pizzaObj = req.body
    const validationResult = validatePizzaCreateForm(pizzaObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    pizzaObj.ingredients = pizzaObj.ingredients.split(',').filter(i => i !== '')

    Pizza
      .findById(pizzaId)
      .then(existingPizza => {
        existingPizza.name = pizzaObj.name
        existingPizza.ingredients = pizzaObj.ingredients
        existingPizza.weight = pizzaObj.weight
        existingPizza.description = pizzaObj.description
        existingPizza.price = pizzaObj.price
        existingPizza.image = pizzaObj.image

        existingPizza
          .save()
          .then(editedPizza => {
            res.status(200).json({
              success: true,
              message: 'Pizza edited successfully.',
              data: editedPizza
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Pizza with the given name already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/all', (req, res) => {
  Pizza
    .find()
    .then(pizzas => {
      res.status(200).json(pizzas)
    })
})

router.post('/review/:id', authCheck, (req, res) => {
  const id = req.params.id
  const review = req.body.review
  const username = req.user.username

  if (review.length < 4) {
    const message = 'Review must be at least 4 characters long.'
    return res.status(200).json({
      success: false,
      message: message
    })
  }

  Pizza
    .findById(id)
    .then(pizza => {
      if (!pizza) {
        return res.status(200).json({
          success: false,
          message: 'Product not found.'
        })
      }

      let reviewObj = {
        review,
        createdBy: username
      }

      let reviews = pizza.reviews
      reviews.push(reviewObj)
      pizza.reviews = reviews
      pizza
        .save()
        .then((pizza) => {
          res.status(200).json({
            success: true,
            message: 'Review added successfully.',
            data: pizza
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :( Check the form for errors.'
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :( Check the form for errors.'
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/like/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Pizza
    .findById(id)
    .then(pizza => {
      if (!pizza) {
        const message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = pizza.likes
      if (!likes.includes(username)) {
        likes.push(username)
      }
      pizza.likes = likes
      pizza
        .save()
        .then((pizza) => {
          res.status(200).json({
            success: true,
            message: 'Product liked successfully.',
            data: pizza
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/unlike/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Pizza
    .findById(id)
    .then(pizza => {
      if (!pizza) {
        let message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = pizza.likes
      if (likes.includes(username)) {
        const index = likes.indexOf(username)
        likes.splice(index, 1)
      }

      pizza.likes = likes
      pizza
        .save()
        .then((pizza) => {
          res.status(200).json({
            success: true,
            message: 'Product unliked successfully.',
            data: pizza
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Pizza
      .findById(id)
      .then((pizza) => {
        pizza
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Pizza deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

module.exports = router
