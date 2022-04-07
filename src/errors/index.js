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

module.exports = {
  HttpError,
  NotUniqueError,
  NotFoundError,
  UnauthorizedError
}