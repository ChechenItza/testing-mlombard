const { NotFoundError, UnauthorizedError } = require('../errors')
const { Branch } = require('../models')
const { saveImg, genThumbnail, deleteImg } = require('../image/image.service')
const roles = require('../utils/roles')

async function create(userId, branch, image) {
  branch.imageSrc = await saveImg(image.buffer, image.originalname) 
  branch.thumbnailSrc = await genThumbnail(image.buffer, image.originalname)
  branch.ownerId = userId

  const newBranch = new Branch(branch)
  await newBranch.save()
}

async function get(branchId, userId, role) {
  const branch = await Branch.findOne({ _id: branchId })
  if (!branch)
    throw new NotFoundError('branch')

  if (branch.ownerId !== userId && role !== roles.admin)
    throw new UnauthorizedError('permission level')

  return branch
}

async function remove(branchId, userId, role) {
  const branch = await Branch.findOne({ _id: branchId })
  if (!branch)
    throw new NotFoundError('branch')

  if (branch.ownerId !== userId && role !== roles.admin && role !== roles.moderator)
    throw new UnauthorizedError('permission level')

  await deleteImg(branch.imageSrc)
  await deleteImg(branch.thumbnailSrc)
  return Branch.findOneAndDelete({ _id: branchId })
}

module.exports = {
  create,
  get,
  remove
}
