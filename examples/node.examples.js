var fiqlQueryBuilder = require('../lib');

// Example standard basic operator
var eqNode = fiqlQueryBuilder.convertFromNode(
    new fiqlQueryBuilder.EqNode(
        new fiqlQueryBuilder.LeafNode('foo'), 
        new fiqlQueryBuilder.LeafNode('bar')
    )
);
// eqNode = foo==bar

// Example custom basic operator
var customOperatorNode = fiqlQueryBuilder.convertFromNode(
    new fiqlQueryBuilder.OpNode(
        new fiqlQueryBuilder.LeafNode('foo'), 
        '¬', 
        new fiqlQueryBuilder.LeafNode('bar')
    )
);
// customOperatorNode equals: foo¬bar 

// Example standard boolean expression
var andNode = fiqlQueryBuilder.convertFromNode(
    new fiqlQueryBuilder.AndNode([
        new fiqlQueryBuilder.EqNode(
            new fiqlQueryBuilder.LeafNode('foo'), 
            new fiqlQueryBuilder.LeafNode('bar')
        ),
        new fiqlQueryBuilder.NeqNode(
            new fiqlQueryBuilder.LeafNode('baz'), 
            new fiqlQueryBuilder.LeafNode('qux')
        )
    ])
);
// andNode equals: foo==bar;baz!=qux


// Example custom boolean expression
var customExpressionNode = fiqlQueryBuilder.convertFromNode(
    new fiqlQueryBuilder.ExpNode('*', [
        new fiqlQueryBuilder.EqNode(
            new fiqlQueryBuilder.LeafNode('foo'),
            new fiqlQueryBuilder.LeafNode('bar')
        ),
        new fiqlQueryBuilder.NeqNode(
            new fiqlQueryBuilder.LeafNode('baz'), 
            new fiqlQueryBuilder.LeafNode('qux')
        )
    ])
);
// customExpressionNode equals: foo==bar*baz!=qux

// Example grouping and nested arguments
var groupNode = fiqlQueryBuilder.convertFromNode(
    new fiqlQueryBuilder.EqNode(
        new fiqlQueryBuilder.LeafNode('k'),
        new fiqlQueryBuilder.GroupNode(
            new fiqlQueryBuilder.AndNode([
                new fiqlQueryBuilder.LtNode(
                    new fiqlQueryBuilder.LeafNode('foo'),
                    new fiqlQueryBuilder.LeafNode('bar')
                ),
                new fiqlQueryBuilder.NeqNode(
                    new fiqlQueryBuilder.LeafNode('baz'),
                    new fiqlQueryBuilder.LeafNode('qux')
                )
            ])
        )
    )
);
// groupNode equals: k==(foo=lt=bar,baz!=qux)