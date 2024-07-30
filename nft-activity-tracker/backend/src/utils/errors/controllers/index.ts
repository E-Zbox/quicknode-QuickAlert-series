export class RequestBodyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RequestBodyError";
  }
}

export class RequestURLError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RequestURLError";
  }
}
