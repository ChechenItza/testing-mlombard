const mongoose = require('mongoose')

const editBlockSchema = new mongoose.Schema({
  branchId: String,
  until: {
    type: Date,
    expires: 0
  }
})

editBlockSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('EditBlock', editBlockSchema)