const withValidUser = require('./withValidUser')
const errorHandler = require('./errorHandler')
const unknownEndpoint = require('./unknownEndpoint')
const authorize = require('./authorize')

module.exports = {
  withValidUser,
  errorHandler,
  unknownEndpoint,
  authorize
}