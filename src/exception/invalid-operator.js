export default class InvalidOperatorError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, InvalidOperatorError);
  }
}
