const mongoose = require('mongoose')
const User = require('../models/User')
const Pizza = require('../models/Pizza')

mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db)
  let db = mongoose.connection

  db.once('open', err => {
    if (err) {
      throw err
    }

    console.log('MongoDB ready!')

    User.seedAdminUser()
    Pizza.seedPizzas()
  })

  db.on('error', err => console.log(`Database error: ${err}`))
}
