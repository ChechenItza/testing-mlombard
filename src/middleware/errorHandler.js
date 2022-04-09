const logger = require('../utils/logger')
const { HttpError } = require('../errors') 

function errorHandler(err, req, res, next) {
  logger.error(err)

  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message })
  } else if (err.name == 'ValidationError') {
    res.status(403).json({ error: err.message })
  } else if (err.name == 'MulterError') {
    res.status(400).json({ error: err.message })
  } else {
    res.status(500).end()
  }
}

module.exports = errorHandler