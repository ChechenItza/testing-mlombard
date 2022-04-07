const tokenService = require('./token.service')

function refresh(req, res, next) {
  try {
    var tokenPair = await tokenService.refresh(req.payload.uuid)
  } catch(err) {
    return next(err)
  }

  res.json(tokenPair)
}

module.exports = {
  refresh
}