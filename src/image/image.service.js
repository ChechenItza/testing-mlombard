const fs = require('fs').promises
const os = require('os')
const path = require('path')
const sharp = require('sharp')
const { PORT } = require('../utils/config')

const thumbnailPrefix = 'thumbnail_'
const rootFolder = 'media'

async function saveImg(image, filename, prefix = '') {
  const relPath = `${rootFolder}/${prefix}${Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(filename)}`
  await fs.writeFile(path.resolve(process.cwd(), relPath), image)
  return `http://${os.hostname}:${PORT}/${relPath}`
}

async function genThumbnail(thumbnail, filename) {
  return saveImg(
    await sharp(thumbnail)
      .resize(165, 165)
      .toBuffer(),
    filename,
    thumbnailPrefix
  )
}

async function deleteImg(imageSrc) {
  const relPath = extractRelative(imageSrc)
  return fs.unlink(path.resolve(process.cwd(), relPath))
}

function extractRelative(imageSrc) {
  return imageSrc.substring(imageSrc.indexOf(rootFolder))
}
 
module.exports = {
    saveImg,
    genThumbnail,
    deleteImg
}