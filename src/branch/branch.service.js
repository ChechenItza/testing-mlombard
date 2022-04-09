const fs = require('fs').promises
const path = require('path')
const sharp = require('sharp')
const { Branch } = require('../models')

async function create(userId, { name, address, work_hours_start, work_hours_end }, image) {
  const imageSrc = await saveImg(image.buffer, image.originalname) 
  const thumbnailSrc = await saveImg(await thumbnailFromImg(image.buffer), 'thumbnail_' + image.originalname)
  const newBranch = new Branch({
    name,
    address,
    workHoursStart: work_hours_start,
    workHoursEnd: work_hours_end,
    imageSrc,
    thumbnailSrc,
    ownerId: userId
  })

  await newBranch.save()
}

function saveImg(image, filename) {
  const relPath = `media/${Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(filename)}`
  fs.writeFile(path.resolve(process.cwd(), relPath), image)
  return relPath
}

function thumbnailFromImg(image) {
  return sharp(image)
    .resize(165, 165)
    .toBuffer()
}

module.exports = {
  create
}
