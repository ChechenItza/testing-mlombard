const path = require('path')
const { InvalidError } = require('../errors')

const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 //5MB
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
      cb(null, true)
    else
      cb(new InvalidError('image format should be either of jpeg|jpg|png'))
  }
})

const Joi = require('joi')

const branchSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(1)
    .max(128)
    .required(),

  address: Joi.string()
    .pattern(new RegExp('^[a-z\d\s]{3,128}$'))
    .required(),

  work_hours: Joi.object({
    start: Joi.string()
      .regex('^([01][0-9]|2[0-3]):([0-5][0-9])$')
      .required(),
    end: Joi.string()
      .regex('^([01][0-9]|2[0-3]):([0-5][0-9])$') //TODO:  needs to be later than start
      .required()
  }),
})

async function withValidBranch() {
  return [
    upload.single('image'),
    (req, res, next) => {
      try {
        var branch = await branchSchema.validateAsync(req.body)
      } catch (err) { 
        return next(err)
      }

      req.branch = branch
      next()
    } 
  ]
}

module.exports = withValidBranch