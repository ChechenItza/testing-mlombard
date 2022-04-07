const User = require('../models/user')
const roles = require('../utils/roles')
const { NotFoundError, InvalidError } = require('../errors')

async function changeRole(userId) {
  let user = await User.findOne({ _id: userId })
  if (!user)
    throw new NotFoundError('user')

  if (user.role !== roles.user)
    throw new InvalidError("subject's role is not user")

  user.role = roles.moderator
  await user.save()
}

module.exports = {
  changeRole
}