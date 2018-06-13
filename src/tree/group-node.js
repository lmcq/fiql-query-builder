import { InvalidGroupChildError } from '../exception';
import { ExpNode } from './';

/**
 * Wraps the child expresison in parentheses to
 * provide higher precendence in evaulation.
 */
export class GroupNode {
  /**
   * Initialise new GroupNode
   * @param {ExpNode} exp
   */
  constructor(exp) {
    this.exp = exp;
  }

  /**
   * Wrap and build child
   */
  build() {
    if (!(this.exp instanceof ExpNode)) {
      throw new InvalidGroupChildError('Only boolean expressions can be wrapped in parentheses.');
    }
    return `(${this.exp.build()})`;
  }
}
