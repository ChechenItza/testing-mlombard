const { withValidUser, errorHandler, unknownEndpoint } = require('./middleware')
const { login, signup } = require('./auth/auth.controller')

function registerRoutes(app) {
  app.use(['/auth/login', '/auth/signup'], withValidUser)
  app.post('/auth/login', login)
  app.post('/auth/signup', signup)

  app.use(unknownEndpoint)
  app.use(errorHandler)
}

module.exports = registerRoutes