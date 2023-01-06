export class CustomError extends Error {
  /**
   * Create custom error
   *
   * @param {*} message Error message for request response
   * @param {number} statusCode HTTP status code. Default is 400
   */
  statusCode: number
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 400;
  }
}

export class BadRequestError extends Error {
  /**
   * Create custom error
   *
   * @param {*} message Error message for request response
   */
  statusCode: number
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 400
  }
}


export class NotFoundError extends Error {
  /**
   * Create custom error
   *
   * @param {*} message Error message for request response
   */
  statusCode
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 404
  }
}

export class ServerError extends Error {
  /**
   * Create custom error
   *
   * @param {*} message Error message for request response
   */
  statusCode: number
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 500
  }
}


export class UnAuthorizedError extends Error {
  /**
   * Create custom error
   *
   * @param {*} message Error message for request response
   */
  statusCode: number
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 401
  }
}

