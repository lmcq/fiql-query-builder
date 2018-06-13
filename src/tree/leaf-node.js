/**
 * Represents a value, can be selector or argument
 */
export class LeafNode {
  /**
   * Initialise the leaf
   * @param {string|number} v The value of the leaf node
   */
  constructor(v) {
    this.v = v;
  }
  build() {
    return this.v;
  }
}
