const express = require('express')
const authCheck = require('../config/auth-check')
const Order = require('../models/Order')

const router = new express.Router()

router.post('/submit', authCheck, (req, res) => {
  const products = req.body
  let orderObj = {
    creator: req.user._id,
    products
  }

  Order
    .create(orderObj)
    .then((createdOrder) => {
      res.status(200).json({
        success: true,
        message: 'Order created successfully.',
        data: createdOrder
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

router.get('/user', authCheck, (req, res) => {
  Order
    .find({creator: req.user._id})
    .then(orders => {
      res.status(200).json(orders)
    })
})

router.get('/pending', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    Order
      .find({status: 'Pending'})
      .then(orders => {
        res.status(200).json(orders)
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/approve/:id', authCheck, (req, res) => {
  const orderId = req.params.id
  Order
    .findById(orderId)
    .then(order => {
      if (!order) {
        const message = 'Order not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      order.status = 'Approved'
      order
        .save()
        .then(() => {
          res.status(200).json({
            success: true,
            message: 'Order approved successfully.'
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

module.exports = router
