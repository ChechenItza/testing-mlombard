const argon2 = require('argon2')
const roles = require('../utils/roles')
const { UnauthorizedError, NotUniqueError } = require('../errors')
const { User } = require('../models')

async function login(user) {
  const dbUser = await User.findOne({ username: user.username })
  if (!dbUser)
    throw new UnauthorizedError('username')

  const match = await argon2.verify(dbUser.password, user.password)
  if (!match)
    throw new UnauthorizedError('password')

  return dbUser
}

async function signup(user) {
  const dbUser = await User.findOne({ username: user.username })
  if (dbUser)
    throw new NotUniqueError('username')

  user.password = await argon2.hash(user.password)
  user.role = roles.user

  let newUser = new User(user)
  await newUser.save()

  return newUser
}

module.exports = {
  login,
  signup
}