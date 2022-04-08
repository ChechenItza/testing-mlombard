const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
  name: String,
  address: String,
  workHours: {
    start: String,
    end: String
  },
  imageSrc: String,
  thumbnailSrc: String,
  ownerId: String
})

branchSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Branch', branchSchema)