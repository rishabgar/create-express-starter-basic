class appSuccess {
  statusCode: number;
  message: string;
  data: any | null;

  constructor(statusCode: number, message: string, data: any | null = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default appSuccess;
