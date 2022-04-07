const userService = require('./user.service')

async function changeRole(req, res, next) {
  try {
    await userService.changeRole(req.params.id)
  } catch(err) {
    return next(err)
  }

  res.status(200).end()
}

module.exports = {
  changeRole
}