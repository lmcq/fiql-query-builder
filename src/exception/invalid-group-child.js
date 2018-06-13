export default class InvalidGroupChildError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, InvalidGroupChildError);
  }
}
