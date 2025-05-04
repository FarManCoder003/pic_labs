class ApiSuccess {
  constructor(statusCode, message, data) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data ?? {};
  }
  static success(message, data) {
    return new ApiSuccess(200, message, data);
  }
  static created(message, data) {
    return new ApiSuccess(201, message, data);
  }
  static accepted(message, data) {
    return new ApiSuccess(202, message, data);
  }
  static noContent(message, data) {
    return new ApiSuccess(204, message, data);
  }
  static resetContent(message, data) {
    return new ApiSuccess(205, message, data);
  }
  static customSuccess(statusCode, message, data) {
    return new ApiSuccess(statusCode, message, data);
  }
}

export default ApiSuccess;
