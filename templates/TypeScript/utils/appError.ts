class appError extends Error {
  statusCode: number;
  data: any;

  constructor(
    statusCode: number,
    message = "Something went wrong",
    data: any = null
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.data = data;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default appError;
