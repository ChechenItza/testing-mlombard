const fs = require('fs').promises
const path = require('path')
const sharp = require('sharp')
const { Branch } = require('../models')

async function create(userId, { name, address, workHours }, image) {
  const imageSrc = await saveImg(image.buffer, image.filename) 
  const thumbnailSrc = await saveImg(thumbnailFromImg(image.buffer), 'thumbnail_' + image.filename)
  const newBranch = new Branch({
    name,
    address,
    workHours,
    imageSrc,
    thumbnailSrc,
    ownerId: userId
  })
}

function saveImg(image, filename) {
  return fs.writeFile(
    path.resolve(process.cwd(), `media/${new Date.now()}/${filename}`), 
    image
  )
}

