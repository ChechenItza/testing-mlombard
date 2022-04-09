const { 
  withValidUser, 
  errorHandler, 
  unknownEndpoint, 
  authorize, 
  withValidBranch 
} = require('./middleware')
const { login, signup } = require('./auth/auth.controller')
const { refresh } = require('./token/token.controller')
const { changeRole } = require('./user/user.controller')
const { 
  create: createBranch, 
  get: getBranch, 
  remove: removeBranch,
  change: changeBranch
} = require('./branch/branch.controller')
const roles = require('./utils/roles')

function registerRoutes(app) {
  //auth
  app.post('/auth/login', withValidUser, login)
  app.post('/auth/signup', withValidUser, signup)

  //token
  app.post('/auth/refresh', authorize(), refresh)

  //users
  app.patch('/user/:id/role', authorize(roles.admin), changeRole)

  //branches
  app.post('/branch', authorize(), withValidBranch(), createBranch)
  app.get('/branch/:id', authorize(), getBranch)
  app.delete('/branch/:id', authorize(), removeBranch)
  app.put('/branch/:id', authorize(), withValidBranch(), changeBranch)

  app.use(unknownEndpoint)
  app.use(errorHandler)
}

module.exports = registerRoutes