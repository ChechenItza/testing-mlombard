const branchService = require('./branch.service')
const tokenService = require('../token/token.service')

async function create(req, res, next) {
  try {
    const userId = await tokenService.getUserId(req.payload.uuid)
    await branchService.create(userId, req.body)
  } catch(err) {
    return next(err)
  }

  res.json(201).end()
}

module.exports = {
  create
}