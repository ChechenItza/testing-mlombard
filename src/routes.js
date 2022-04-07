const { withValidUser, errorHandler, unknownEndpoint, authorize } = require('./middleware')
const { login, signup } = require('./auth/auth.controller')
const { changeRole } = require('./user/user.controller')
const roles = require('./utils/roles')

function registerRoutes(app) {
  app.post('/auth/login', withValidUser, login)
  app.post('/auth/signup', withValidUser, signup)

  app.patch('/user/:id/role', authorize(roles.admin), changeRole)

  app.use(unknownEndpoint)
  app.use(errorHandler)
}

module.exports = registerRoutes