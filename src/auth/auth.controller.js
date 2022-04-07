const authService = require('./auth.service')

async function login(req, res, next) {
  try {
    var tokenPair = await authService.login(req.user)
  } catch(err) {
    return next(err)
  }

  res.json(tokenPair)
}

async function signup(req, res, next) {
  try {
    var tokenPair = await authService.signup(req.user)
  } catch(err) {
    return next(err)
  }

  res.status(201).json(tokenPair)
}

module.exports = {
  login,
  signup
}