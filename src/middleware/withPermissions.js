const roles = require('../utils/roles')
const { UnauthorizedError } = require('../errors')

function withPermissions(allowedRoles) {
  return (req, res, next) => {
    if (req.user)
  }
}