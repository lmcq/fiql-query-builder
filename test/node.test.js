import {
  assert
} from 'chai';
import {
  convertFromNode
} from '../src';
import {
  EqNode, NeqNode, AndNode, LeafNode, GroupNode, OrNode, OpNode
} from '../src/tree';

const validLeaf = new LeafNode("leaf");
// test===test
const validEqOperator = new EqNode(new LeafNode("test"), new LeafNode("test"));
// test==test;test1!=test1
const validNeqOperator = new NeqNode(new LeafNode("test1"), new LeafNode("test1"));
// test2¬test2
const validCustomOperator = new OpNode(new LeafNode("test2"), "¬", new LeafNode("test2"));
// test==test;test1!=test1
const validAndExp = new AndNode([validEqOperator, validNeqOperator]);
// test1!=test1,test2¬test
const validOrExp = new OrNode([validNeqOperator, validCustomOperator]);
// (test==test;test1!=test1)
const validGroup = new GroupNode(validAndExp);

describe('Equality (RsqlNode)', () => {
  it('should test awesome function', () => {
    const validStr = "test==test";
    const result = convertFromNode(validEqOperator);
    assert.equal(result, validStr, `Invalid eq string`)
  });
});

describe('Custom Operator (RsqlNode)', () => {
    it('should test awesome function', () => {
      const validStr = "test2¬test2";
      const result = convertFromNode(validCustomOperator);
      assert.equal(result, validStr, `Invalid eq string`)
    });
  });

describe('And Node (RsqlNode)', () => {
  it('should test awesome function', () => {
    const validStr = "test==test;test1!=test1";
    const result = convertFromNode(validAndExp);
    assert.equal(result, validStr, `Invalid and`)
  });
});

describe('Or Node (RsqlNode)', () => {
    it('should test awesome function', () => {
      const validStr = "test1!=test1,test2¬test2";
      const result = convertFromNode(validOrExp);
      assert.equal(result, validStr, `Invalid and`)
    });
  });

describe('Group (RsqlNode)', () => {
    it('should test awesome function', () => {
      const validStr = "(test==test;test1!=test1)";
      const result = convertFromNode(validGroup);
      assert.equal(result, validStr, `Invalid group`)
    });
  });
