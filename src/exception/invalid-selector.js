export default class InvalidSelectorError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, InvalidSelectorError);
  }
}
