export default class InvalidExpressionChildError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, InvalidExpressionChildError);
  }
}
