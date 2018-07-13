const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(passport.initialize())
  app.use(cors())
  console.log('Express ready!')
}
