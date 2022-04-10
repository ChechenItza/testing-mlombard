class HttpError extends Error {
  constructor(status, message) {
    super(message)
    Object.setPrototypeOf(this, HttpError.prototype)

    this.name = 'HttpError'
    this.status = status
  }
}

class NotUniqueError extends HttpError {
  constructor(field) {
    super(409, `this ${field} already exists`)
    Object.setPrototypeOf(this, NotUniqueError.prototype)

    this.name = 'NotUniqueError'
  }
}

class NotFoundError extends HttpError {
  constructor(field) {
    super(404, `this ${field} doesn't exist`)
    Object.setPrototypeOf(this, NotFoundError.prototype)

    this.name = 'NotFoundError'
  }
}

class UnauthorizedError extends HttpError {
  constructor(field) {
    super(401, `invalid ${field}`)
    Object.setPrototypeOf(this, UnauthorizedError.prototype)

    this.name = 'UnauthorizedError'
  }
}

class InvalidError extends HttpError {
  constructor(message) {
    super(400, message)
    Object.setPrototypeOf(this, InvalidError.prototype)

    this.name = 'InvalidError'
  }
}

class ForbiddenError extends HttpError {
  constructor(message) {
    super(403, message)
    Object.setPrototypeOf(this, ForbiddenError.prototype)

    this.name = 'ForbiddenError'
  }
}

module.exports = {
  HttpError,
  NotUniqueError,
  NotFoundError,
  UnauthorizedError,
  InvalidError,
  ForbiddenError
}