const { withValidUser, errorHandler, unknownEndpoint, authorize, withValidBranch } = require('./middleware')
const { login, signup } = require('./auth/auth.controller')
const { changeRole } = require('./user/user.controller')
const { createBranch } = require('./branch/branch.controller')
const roles = require('./utils/roles')

function registerRoutes(app) {
  app.post('/auth/login', withValidUser, login)
  app.post('/auth/signup', withValidUser, signup)

  app.patch('/user/:id/role', authorize(roles.admin), changeRole)

  app.post('/branch', authorize(), withValidBranch(), createBranch)

  app.use(unknownEndpoint)
  app.use(errorHandler)
}

module.exports = registerRoutes