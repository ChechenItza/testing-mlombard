const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$&()\\-`.+,/"]{3,30}$'))
    .required(),
      
})
  .with('username', 'password')

async function withValidUser(req, res, next) {
  try {
    var user = await userSchema.validateAsync(req.body)
  } catch (err) { 
    return next(err)
  }

  req.user = user
  next()
}

module.exports = withValidUser