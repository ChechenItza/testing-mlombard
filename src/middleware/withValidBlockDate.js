const Joi = require('joi');

const blockDateSchema = Joi.object({
  until: Joi.date().greater('now').required()
})

async function withValidBlockDate(req, res, next) {
  try {
    var blockDate = await blockDateSchema.validateAsync(req.body)
  } catch (err) { 
    return next(err)
  }

  req.blockDate = blockDate.until
  next()
}

module.exports = withValidBlockDate