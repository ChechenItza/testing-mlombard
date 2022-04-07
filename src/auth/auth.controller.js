const authService = require('./auth.service')
const tokenService = require('../token/token.service')

async function login(req, res, next) {
  try {
    const user = await authService.login(req.user)
    var tokenPair = await tokenService.genTokenPair(user._id.toString(), user.role)
  } catch(err) {
    return next(err)
  }

  res.json(tokenPair)
}

async function signup(req, res, next) {
  try {
    const user = await authService.signup(req.user)
    var tokenPair = await tokenService.genTokenPair(user._id.toString(), user.role)
  } catch(err) {
    return next(err)
  }

  res.status(201).json(tokenPair)
}

module.exports = {
  login,
  signup
}