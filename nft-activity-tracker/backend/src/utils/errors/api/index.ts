export class MissingEnvError extends Error {
  constructor() {
    super(`Missing environment variables`);
    this.name = "MissingEnvError";
  }
}
