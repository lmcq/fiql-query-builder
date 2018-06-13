import {
  OpNode,
  ExpNode,
  GroupNode,
  LeafNode,
  AndNode,
  OrNode,
  EqNode,
  NeqNode,
  LeNode,
  LtNode,
  GtNode,
  GeNode,
  InNode,
  NotInNode,
} from './tree';
import { keyConstants } from './constants';
import { InvalidRootError } from './exception';

/**
 * Recursively traverse tree to build query parameter
 * @param {FiqlNode} node The root node
 */
export const convertFromNode = (node) => {
  // If the node is a boolean or operator, traverse
  if (node instanceof OpNode || node instanceof ExpNode || node instanceof GroupNode) {
    return convertFromNode(node.build());
  }
  // We've hit the leaf
  return node;
};

/**
 * Recursively trave JSON object and convert to FiqlNode
 * @param {Object} json JSON representation of FIQL query
 */
const convertToNode = (json) => {
  /**
   * Produce FiqlNode based on key of JSON object
   * @param {String} k The key of the JSON object
   * @param {Object} v The value of the JSON object
   */
  const handleKey = (k, v) => {
    switch (k.toLocaleLowerCase()) {
      case keyConstants.GROUP:
        return new GroupNode(convertToNode(v));
      case keyConstants.AND:
        return new AndNode(convertToNode(v));
      case keyConstants.OR:
        return new OrNode(convertToNode(v));
      case keyConstants.EQUALS:
        return new EqNode(convertToNode(v.selector), convertToNode(v.args));
      case keyConstants.NOT_EQUALS:
        return new NeqNode(convertToNode(v.selector), convertToNode(v.args));
      case keyConstants.LESS_THAN_OR_EQUAL:
        return new LeNode(convertToNode(v.selector), convertToNode(v.args));
      case keyConstants.LESS_THAN:
        return new LtNode(convertToNode(v.selector), convertToNode(v.args));
      case keyConstants.GREATER_THAN:
        return new GtNode(convertToNode(v.selector), convertToNode(v.args));
      case keyConstants.GREATER_THAN_OR_EQUAL:
        return new GeNode(convertToNode(v.selector), convertToNode(v.args));
      case keyConstants.IN:
        return new InNode(convertToNode(v.selector), convertToNode(v.args));
      case keyConstants.OUT:
        return new NotInNode(convertToNode(v.selector), convertToNode(v.args));
      case keyConstants.CUSTOM_OPERATOR:
        return new OpNode(convertToNode(v.selector), v.operator, convertToNode(v.args));
      case keyConstants.CUSTOM_EXPRESSION:
        return new ExpNode(v.operator, convertToNode(v.children));
      default:
        return v;
    }
  };

  // We get an array when we traverse an expression
  if (Array.isArray(json)) {
    return json.map(child => convertToNode(child));
  }

  // Recursively traverse object until value hit, then
  // produce a leaf node
  if (json instanceof Object) {
    const children = Object.keys(json).map(k => handleKey(k, json[k]));
    if (children.length === 1) {
      return children[0];
    }
    return children;
  }
  return new LeafNode(json);
};

/**
 * Converts a JSON object to a FiqlNode then to a query string
 * @param {Object} json JSON Object to convert
 */
export const convertFromJson = (json) => {
  if (json instanceof Object && !Array.isArray(json)) {
    return convertFromNode(convertToNode(json));
  }
  throw new InvalidRootError('Root must be JSON Object.');
};
