// src/utils/ResponseError.ts

export enum ErrorType {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class ResponseError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  static BAD_REQUEST(message: string) {
    return new ResponseError(ErrorType.BAD_REQUEST, message);
  }

  static UNAUTHORIZED(message: string) {
    return new ResponseError(ErrorType.UNAUTHORIZED, message);
  }

  static FORBIDDEN(message: string) {
    return new ResponseError(ErrorType.FORBIDDEN, message);
  }

  static NOT_FOUND(message: string) {
    return new ResponseError(ErrorType.NOT_FOUND, message);
  }

  static INTERNAL_SERVER_ERROR(message: string) {
    return new ResponseError(ErrorType.INTERNAL_SERVER_ERROR, message);
  }
}
