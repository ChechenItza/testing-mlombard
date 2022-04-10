const jwt = require('jsonwebtoken')
const { UnauthorizedError, ForbiddenError } = require('../errors')
const { JWT_SECRET } = require('../utils/config')

function withPayload(req, res, next) {
  //extract bearer token
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return next(new UnauthorizedError('token'))

  const token = authHeader.substring(7, authHeader.length)
  //verify token and extract payload
  try {
    var payload = jwt.verify(token, JWT_SECRET) //TODO: async version of this function
  } catch (err) {
    return next(new UnauthorizedError('token'))
  }

  req.payload = payload
  next()
}

function authorize(...roles) {
  return [
    withPayload,

    (req, res, next) => {
      if (roles.length && !roles.includes(req.payload.role)) {
        return next(new ForbiddenError('access to this endpoint is not permitted'))
      }

      next()
    }
  ]
}

module.exports = authorize