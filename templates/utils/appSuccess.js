class appSuccess {
  constructor(statusCode, message, data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default appSuccess;
