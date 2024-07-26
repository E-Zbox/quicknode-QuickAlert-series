export class RequestURLError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RequestURLError";
  }
}
