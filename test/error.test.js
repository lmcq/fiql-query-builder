import {
  assert
} from 'chai';
import {
  convertFromJson
} from '../src';
import {
  InvalidRootError,
  InvalidOperatorError,
  InvalidExpressionChildError,
  InvalidSelectorError,
  InvalidGroupChildError
} from '../src/exception';

const invalidRoot = [];

const invalidSelector = {
  equals: {
    selector: {
      value: "incorrect"
    },
    args: "test"
  }
}

const invalidExpChild = {
  and: [{
    value: "incorrect"
  }]
}

const invalidExpChild2 = {
  and: {
    value: "incorrect"
  }
}

const invalidGroupChild = {
  group: {
    value: "incorrect"
  }
}

const invalidOperator = {
  custom_operator: {
    operator: {
      value: "incorrect"
    }

  }
}

describe('Invalid selector type (Error)', () => {
  it(`should throw InvalidSelectorError`, () => {
    assert.throws(() => convertFromJson(invalidSelector), InvalidSelectorError, `Selectors must be a LeafNode.`)
  });
});

describe('Invalid expression child (Error)', () => {
  it(`should throw InvalidExpressionChildError`, () => {
    assert.throws(() => convertFromJson(invalidExpChild), InvalidExpressionChildError, `Boolean expression child must be operators, values or (grouped) boolean expression.`)
  });
});

describe('Invalid expression child (non-array) (Error)', () => {
  it(`should throw InvalidExpressionChildError`, () => {
    assert.throws(() => convertFromJson(invalidExpChild2), InvalidExpressionChildError, `Expression must have Array child.`)
  });
});

describe('Invalid group child (Error)', () => {
  it(`should throw InvalidGroupChildError`, () => {
    assert.throws(() => convertFromJson(invalidGroupChild), InvalidGroupChildError, `Only boolean expressions can be wrapped in parentheses.`)
  });
});

describe('Invalid operator type (Error)', () => {
  it(`should throw InvalidOperatorError`, () => {
    assert.throws(() => convertFromJson(invalidOperator), InvalidOperatorError, `Operator must be a string.`)
  });
});

describe('Invalid root type (Error)', () => {
  it(`should throw InvalidRootError`, () => {
    assert.throws(() => convertFromJson(invalidRoot), InvalidRootError, `Root must be JSON Object.`)
  });
});