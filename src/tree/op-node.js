import { InvalidOperatorError, InvalidSelectorError } from '../exception';
import { LeafNode } from './';

/**
 * Generic operator node
 */
export class OpNode {
  /**
     * Initialises operator node
     * @param {string} selector The operator selector (left-side)
     * @param {string} operator The operator (==, !=, etc.)
     * @param {FiqlNode} args Argument for operator (right-side)
     */
  constructor(selector, operator, args) {
    this.selector = selector;
    this.operator = operator;
    this.args = args;
  }

  build() {
    if (!(this.selector instanceof LeafNode)) {
      throw new InvalidSelectorError('Selectors must be a LeafNode.');
    }
    if (typeof this.operator !== 'string') {
      throw new InvalidOperatorError('Operator must be a string.');
    }
    return `${this.selector.build()}${this.operator}${this.args.build()}`;
  }
}

export class EqNode extends OpNode {
  constructor(selector, args) {
    super(selector, '==', args);
  }
}

export class NeqNode extends OpNode {
  constructor(selector, args) {
    super(selector, '!=', args);
  }
}

export class LtNode extends OpNode {
  constructor(selector, args) {
    super(selector, '=lt=', args);
  }
}

export class LeNode extends OpNode {
  constructor(selector, args) {
    super(selector, '=le=', args);
  }
}

export class GtNode extends OpNode {
  constructor(selector, args) {
    super(selector, '=gt=', args);
  }
}

export class GeNode extends OpNode {
  constructor(selector, args) {
    super(selector, '=ge=', args);
  }
}

export class InNode extends OpNode {
  constructor(selector, args) {
    super(selector, '=in=', args);
  }
}

export class NotInNode extends OpNode {
  constructor(selector, args) {
    super(selector, '=out=', args);
  }
}
