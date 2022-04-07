const bcrypt = require('bcrypt')
const roles = require('../utils/roles')
const { UnauthorizedError } = require('../errors')
const { User } = require('../models')
const tokenService = require('../token/token.service')

async function login(user) {
  const dbUser = await User.find({ username: user.username })

  const match = await bcrypt.compare(user.password, dbUser.password)
  if (!match)
    throw new UnauthorizedError('password')

  return tokenService.genTokenPair(dbUser._id.toString(), dbUser.role)
}

async function signup(user) {
  user.password = await hashPass(user.password)
  user.role = roles.user

  let newUser = new User(user)
  await newUser.save()

  return tokenService.genTokenPair(newUser._id.toString(), newUser.role)
}

async function hashPass(password) {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

module.exports = {
  login,
  signup
}