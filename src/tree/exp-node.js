import { InvalidExpressionChildError } from '../exception';
import { GroupNode, OpNode } from './';

/**
 * Generic boolean expression node
 */
export class ExpNode {
  /**
   * Initialise the node
   * @param {RsqlNode[]} children A list of child nodes to evaulate
   * @param {String} operator The boolean operator (e.g. and, or)
   */
  constructor(operator, children) {
    this.operator = operator;
    this.children = children;
  }

  build() {
    if (!Array.isArray(this.children)) {
      throw new InvalidExpressionChildError('Expression must have Array child.');
    }
    // Recursively build children and then join using the operator
    return `${this.children.map((child) => {
      if (child instanceof OpNode || child instanceof ExpNode || child instanceof GroupNode) {
        return child.build();
      }
      throw new InvalidExpressionChildError('Boolean expression child must be operators or (grouped) boolean expression.');
    }).join(this.operator)}`;
  }
}

export class AndNode extends ExpNode {
  constructor(children) {
    super(';', children);
  }
}

export class OrNode extends ExpNode {
  constructor(children) {
    super(',', children);
  }
}
