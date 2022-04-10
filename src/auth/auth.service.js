const bcrypt = require('bcrypt')
const roles = require('../utils/roles')
const { UnauthorizedError, NotUniqueError } = require('../errors')
const { User } = require('../models')

async function login(user) {
  const dbUser = await User.findOne({ username: user.username })
  if (!dbUser)
    throw new UnauthorizedError('username')

  const match = await bcrypt.compare(user.password, dbUser.password)
  if (!match)
    throw new UnauthorizedError('password')

  return dbUser
}

async function signup(user) {
  const dbUser = await User.findOne({ username: user.username })
  if (dbUser)
    throw new NotUniqueError('username')

  const saltRounds = 10
  user.password = await bcrypt.hash(user.password, saltRounds)

  user.role = roles.user

  let newUser = new User(user)
  await newUser.save()

  return newUser
}

module.exports = {
  login,
  signup
}