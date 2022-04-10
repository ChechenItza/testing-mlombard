const { NotFoundError, UnauthorizedError, ForbiddenError } = require('../errors')
const { Branch, EditBlock } = require('../models')
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
    throw new ForbiddenError('access to this branch is not permitted')

  return branch
}

async function remove(branchId, userId, role) {
  const branch = await Branch.findOne({ _id: branchId })
  if (!branch)
    throw new NotFoundError('branch')

  if (branch.ownerId !== userId && role !== roles.admin && role !== roles.moderator)
    throw new ForbiddenError('access to this branch is not permitted')

  await deleteImg(branch.imageSrc)
  await deleteImg(branch.thumbnailSrc)
  return Branch.findOneAndDelete({ _id: branchId })
}

async function change(userId, branchId, newBranch, image, role) {
  const oldBranch = await Branch.findOne({ _id: branchId })
  if (!oldBranch)
    throw new NotFoundError('branch')

  if (oldBranch.ownerId !== userId && role !== roles.admin && role !== roles.moderator)
    throw new ForbiddenError('access to this branch is not permitted')

  if (role !== roles.admin) {
    const block = await EditBlock.findOne({ branchId: oldBranch._id })
    if (block)
      throw new ForbiddenError(`this branch is blocked for changes until: ${block.until}`)
  }

  newBranch.imageSrc = await saveImg(image.buffer, image.originalname) 
  newBranch.thumbnailSrc = await genThumbnail(image.buffer, image.originalname)
  await Branch.findByIdAndUpdate({ _id: branchId }, newBranch)

  await deleteImg(oldBranch.imageSrc)
  await deleteImg(oldBranch.thumbnailSrc)
}

async function blockChanges(branchId, until) {
  const editBlock = new EditBlock({ 
    branchId,
    until 
  })
  await editBlock.save()
}

module.exports = {
  create,
  get,
  remove,
  change,
  blockChanges
}
