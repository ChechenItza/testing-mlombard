const branchService = require('./branch.service')
const tokenService = require('../token/token.service')

async function create(req, res, next) {
  try {
    const userId = await tokenService.getUserId(req.payload.uuid)
    await branchService.create(userId, req.body, req.file)
  } catch(err) {
    return next(err)
  }

  res.status(201).end()
}

async function get(req, res, next) {
  try {
    const userId = await tokenService.getUserId(req.payload.uuid)
    var branch = await branchService.get(req.params.id, userId, req.payload.role)
  } catch(err) {
    return next(err)
  }

  res.json(branch)
}

async function remove(req, res, next) {
  try {
    const userId = await tokenService.getUserId(req.payload.uuid)
    await branchService.remove(req.params.id, userId, req.payload.role)
  } catch(err) {
    return next(err)
  }

  res.status(200).end()
}

async function change(req, res, next) {
  try {
    const userId = await tokenService.getUserId(req.payload.uuid)
    await branchService.change(userId, req.params.id, req.body, req.file, req.payload.role)
  } catch(err) {
    return next(err)
  }

  res.status(200).end()
}

async function blockChanges(req, res, next) {
  try {
    await branchService.blockChanges(req.params.id, req.blockDate)
  } catch(err) {
    return next(err)
  }

  res.status(201).end()
}

module.exports = {
  create,
  get,
  remove,
  change,
  blockChanges
}