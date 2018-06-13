import {
  assert
} from 'chai';
import {
  convertFromJson
} from '../src';

const validEqOperator = {
  equals: {
    selector: "test",
    args: "test"
  }
};
const validNeqOperator = {
  not_equals: {
    selector: "test1",
    args: "test1"
  }
};
const validLtOperator = {
  less_than : {
    selector: "test",
    args: "test"
  }
};
const validLeOperator = {
  less_than_or_equal : {
    selector: "test",
    args: "test"
  }
};
const validGtOperator = {
  greater_than : {
    selector: "test",
    args: "test"
  }
};
const validGeOperator = {
  greater_than_or_equal : {
    selector: "test",
    args: "test"
  }
};
const validInOperator = {
  in : {
    selector: "test",
    args: "test"
  }
};
const validOutOperator = {
  out: {
    selector: "test",
    args: "test"
  }
};
const validCustomOperator = {
  custom_operator: {
    operator: "~",
    selector: "test2",
    args: "test2"
  }
};
const validCustomExpression = {
  custom_expression: {
    operator: "¬;",
    children: {
      equals: validEqOperator.equals,
      not_equals: validNeqOperator.not_equals
    }
  }
};
const validAndExp = {
  and: [{
      equals: validEqOperator.equals
    },
    {
      not_equals: validNeqOperator.not_equals
    }
  ]
};
const validOrExp = {
  or: [{
      not_equals: validNeqOperator.not_equals
    },
    {
      custom_operator: validCustomOperator.custom_operator
    }
  ]
};
const validGroup = {
  group: validAndExp
};
const validNestedExpression = {
  or: [{
      group: {
        and: validAndExp.and,
      }
    },
    {
      equals: validEqOperator.equals
    }
  ]
}


describe('Equality (Json)', () => {
  const validStr = "test==test";
  it(`should equal ${validStr}`, () => {
    const result = convertFromJson(validEqOperator);
    assert.equal(result, validStr, `Invalid eq string`)
  });
});

describe('Inequality (Json)', () => {
  const validStr = "test1!=test1";
  it(`should equal ${validStr}`, () => {
    const result = convertFromJson(validNeqOperator);
    assert.equal(result, validStr, `Invalid eq string`)
  });
});

describe('Less Than (Json)', () => {
  const validStr = "test=lt=test";
  it(`should equal ${validStr}`, () => {
    const result = convertFromJson(validLtOperator);
    assert.equal(result, validStr, `Invalid eq string`)
  });
});

describe('Less Than Or Equal (Json)', () => {
  const validStr = "test=le=test";
  it(`should equal ${validStr}`, () => {
    const result = convertFromJson(validLeOperator);
    assert.equal(result, validStr, `Invalid eq string`)
  });
});

describe('Greater Than (Json)', () => {
  const validStr = "test=gt=test";
  it(`should equal ${validStr}`, () => {
    const result = convertFromJson(validGtOperator);
    assert.equal(result, validStr, `Invalid eq string`)
  });
});

describe('Greater Than Or Equal (Json)', () => {
  const validStr = "test=ge=test";
  it(`should equal ${validStr}`, () => {
    const result = convertFromJson(validGeOperator);
    assert.equal(result, validStr, `Invalid eq string`)
  });
});

describe('In (Json)', () => {
  const validStr = "test=in=test";
  it(`should equal ${validStr}`, () => {
    const result = convertFromJson(validInOperator);
    assert.equal(result, validStr, `Invalid eq string`)
  });
});

describe('Out (Json)', () => {
  const validStr = "test=out=test";
  it(`should equal ${validStr}`, () => {
    const result = convertFromJson(validOutOperator);
    assert.equal(result, validStr, `Invalid eq string`)
  });
});


describe('Custom Operator (Json)', () => {
  const validStr = "test2~test2";
  it(`should equal ${validStr}`, () => {
    const result = convertFromJson(validCustomOperator);
    assert.equal(result, validStr, `Invalid eq string`)
  });
});

describe('Custom Expression (Json)', () => {
  const validStr = "test==test¬;test1!=test1";
  it(`should equal ${validStr}`, () => {
    const result = convertFromJson(validCustomExpression);
    assert.equal(result, validStr, `Invalid eq string`)
  });
});

describe('And Expression (Json)', () => {
  const validStr = "test==test¬;test1!=test1";
  it(`should equal ${validStr}`, () => {
    const validStr = "test==test;test1!=test1";
    const result = convertFromJson(validAndExp);
    assert.equal(result, validStr, `Invalid and`)
  });
});

describe('Or Expression (Json)', () => {
  const validStr = "test1!=test1,test2~test2";
  it(`should equal ${validStr}`, () => {
    const result = convertFromJson(validOrExp);
    assert.equal(result, validStr, `Invalid and`)
  });
});

describe('Group (Json)', () => {
  const validStr = "(test==test;test1!=test1)";
  it(`should equal ${validStr}`, () => {
    const result = convertFromJson(validGroup);
    assert.equal(result, validStr, `Invalid group`)
  });
});

describe('Nested Expression (Json)', () => {
  const validStr = "(test==test;test1!=test1),test==test";
  it(`should equal ${validStr}`, () => {
    const result = convertFromJson(validNestedExpression);
    assert.equal(result, validStr, `Invalid group`)
  });
})
