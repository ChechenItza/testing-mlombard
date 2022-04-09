const branchService = require('./branch.service')
const tokenService = require('../token/token.service')

async function createBranch(req, res, next) {
  try {
    const userId = await tokenService.getUserId(req.payload.uuid)
    await branchService.create(userId, req.body, req.file)
  } catch(err) {
    return next(err)
  }

  res.status(201).end()
}

module.exports = {
  createBranch
}