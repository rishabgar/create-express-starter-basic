class appError extends Error {
  constructor(statusCode, message = "Something went wrong!", data = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default appError;
