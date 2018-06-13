export default class InvalidRootError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, InvalidRootError);
  }
}
