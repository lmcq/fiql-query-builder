var fiqlQueryBuilder = require('../lib');

var eqJson = fiqlQueryBuilder.convertFromJson({
    equals : {
        selector: 'foo',
        args: 'bar'
    }
});
// eqJson = foo==bar

// Example custom basic operator
var customOperatorJson = fiqlQueryBuilder.convertFromJson({
    custom_operator : {
        operator: '¬',
        selector: 'foo',
        args: 'bar' 
    }
});
// customOperatorJson equals: foo¬bar 

// Example standard boolean expression
var andJson = fiqlQueryBuilder.convertFromJson({
    and : [
        {
            equals: {
                selector: 'foo',
                args: 'bar'
            }
        },
        {
            not_equals: {
                selector: 'baz',
                args: 'qux'
            }
        }
    ]
});
// andJson equals: foo==bar;baz!=qux

// Example custom boolean expression
var customExpressionJson = fiqlQueryBuilder.convertFromJson({
    custom_expression : {
        operator: '*',
        children: [
            {
                equals: {
                    selector: 'foo',
                    args: 'bar'
                }
            },
            {
                not_equals: {
                    selector: 'baz',
                    args: 'qux'
                }
            }
        ]
    }
});
// customExpressionJson equals: foo==bar*baz!=qux

// Example grouping and nested arguments
var groupJson = fiqlQueryBuilder.convertFromJson({
    equals : {
        selector: 'k',
        args: {
            group : {
                and : [
                    {
                        less_than: {
                            selector: 'foo',
                            args: 'bar'
                        }
                    },
                    {
                        not_equals: {
                            selector: 'baz',
                            args: 'qux'
                        }
                    }
                ]
            }
        }
    }
});
// groupJson equals: k==(foo=lt=bar,baz!=qux)
