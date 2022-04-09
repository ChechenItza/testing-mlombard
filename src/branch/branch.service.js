const fs = require('fs').promises
const os = require('os')
const path = require('path')
const sharp = require('sharp')
const { Branch } = require('../models')
const { PORT } = require('../utils/config')

async function create(userId, { name, address, work_hours_start, work_hours_end }, image) {
  const imageSrc = await saveImg(image.buffer, image.originalname) 
  const thumbnailSrc = await saveImg(await thumbnailFromImg(image.buffer), 'thumbnail_' + image.originalname)
  const newBranch = new Branch({
    name,
    address,
    workHoursStart: work_hours_start,
    workHoursEnd: work_hours_end,
    imageSrc: `http://${os.hostname}:${PORT}/${imageSrc}`,
    thumbnailSrc: `http://${os.hostname}:${PORT}/${thumbnailSrc}`,
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
