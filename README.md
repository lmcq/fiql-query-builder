# FIQL Query Builder

[![Build Status](https://travis-ci.org/lmcq/fiql-query-builder.svg?branch=master)](https://travis-ci.org/lmcq/fiql-query-builder)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/81108b6e120c4c36b490fc427c620cd8)](https://www.codacy.com/app/lmcq/fiql-query-builder?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=lmcq/fiql-query-builder&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/81108b6e120c4c36b490fc427c620cd8)](https://www.codacy.com/app/lmcq/fiql-query-builder?utm_source=github.com&utm_medium=referral&utm_content=lmcq/fiql-query-builder&utm_campaign=Badge_Coverage)

## Overview

[Feed Item Query Language](https://tools.ietf.org/html/draft-nottingham-atompub-fiql-00) (FIQL) is a simple, URI-friendly query language for filtering entries of web feeds.

This module provides the utility to generate valid FIQL query strings by using a JSON objects or the custom classes provided.

## Installation

```bash
$ npm install fiql-query-builder
```

## Usage

FIQL query strings can be produced by supplying a JSON object, or using the Node classes provided.

### JSON to FIQL

```js

// var json = ...;

// Using require()
var fiqlQueryBuilder = require('fiql-query-builder');
fiqlQueryBuilder.convertFromJson(json);

// Using ES6 import
import { convertFromJson } from 'fiql-query-builder';
convertFromJson(json);

```

#### Basic Operators

| Object Key               | Children                                                                                                     | Description                                           | 
| ------------------------ | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| custom_operator          | <ul><li><b>selector {String} (required)</b> - The left-hand side of the operator</li><li><b>operator {String} (required)</b> - The custom operator</li><li><b>args {Object \| String} (required)</b> - The child node for operator (right-hand side)</li></ul>                      | Define a custom basic operator                   |
| equals                   | <ul><li><b>selector {String} (required)</b></li><li><b>args {Object \| String} (required)</b></li></ul>      | Produces an equality operator (`==`)                  |
| not_equals               | <ul><li><b>selector {String} (required)</b></li><li><b>args {Object \| String} (required)</b>)</li></ul>     | Produces an inequality operator (`!=`)                |
| less_than                | <ul><li><b>selector {String} (required)</b></li><li><b>args {Object \| String} (required)</b></li></ul>      | Produces an less than operator (`=lt=`)               |
| less_than_or_equal       | <ul><li><b>selector {String} (required)</b></li><li><b>args {Object \| String} (required)</b></li></ul>      | Produces an less than or equal operator (`=le=`)      |
| greater_than             | <ul><li><b>selector {String} (required)</b></li><li><b>args {Object \| String} (required)</b></li></ul>       | Produces an greater operator (`=gt=`)                 |
| greater_than_or_equal    | <ul><li><b>selector {String} (required)</b></li><li><b>args {Object \| String} (required)</b></li></ul>      | Produces an greater than or equal operator (`=ge=`)   |
| in                       | <ul><li><b>selector {String} (required)</b></li><li><b>args {Object \| String} (required)</b></li></ul>      | Produces an in operator (`in`)                        |
| out                      | <ul><li><b>selector {String} (required)</b></li><li><b>args {Object \| String} (required)</b></li></ul>      | Produces an out operator (`out`)                      |

#### Boolean Expressions

| Object Key               | Children                                                                                                     | Description                                           | 
| ------------------------ | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| custom_expression        | <ul><li><b>operator {String} (required)</b> - The custom operator</li><li><b>children {Object[]}</b> - The children for the expression</li></ul>                      | Define a custom boolean expression                  |
| and                      | <ul><li><b>_ {Object[]} (required)</b></li></ul>                                                             | Combines child array with an and operator (`;`)       |
| or                       | <ul><li><b>_ {Object[]} (required)</b></li></ul>                                                             | Combines child array with an or operator (`,`)        |

#### Grouping

| Object Key               | Children                                                                | Description                                           | 
| ------------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------- |
| group                    | <ul><li><b>_ {Object} (required)</b> - The child expression</li></ul>   |  Wraps an expression in parentheses                   |

### Node to FIQL

```js

// var node = ...

// Using require()
var fiqlQueryBuilder = require('fiql-query-builder');
fiqlQueryBuilder.convertFromNode(node);

// Using ES6 import
import { convertFromNode, EqNode, AndNode, OpNode } from 'fiql-query-builder';
convertFromNode(node);

```

#### <code>LeafNode(value)</code>
The query param is built by traversing the object tree recursively, so a <code>LeafNode</code> is used to represent a primitive value.
 
| Param     | Type                  | Description                        | 
| --------- | --------------------- | ---------------------------------- |
| value     | <code>string</code>   | The string value                   |

#### <code>OpNode(selector, operator, args)</code>
A generic operator
 
| Param     | Type                  | Description                        | 
| --------- | --------------------- | ---------------------------------- |
| selector  | <code>LeafNode</code> | The left-hand side of the operator |
| operator  | <code>string</code>   | The custom operator                |
| args      | <code>GroupNode \| LeafNode \| ExpNode \| OpNode</code> | The child node for operator (right-hand side) |

##### Subclasses
Standard operator classes have been provided, and can be instantiated using <code>_ClassName_(selector, args)</code>.
* Equality (`==`) : <code>EqNode</code>
* Inequality (`!=`) : <code>NeqNode</code>
* Less than (`=lt=`) : <code>LtNode</code>
* Less than or equal to (`=le=`) : <code>LeNode</code>
* Greater than (`=gt=`) : <code>GtNode</code>
* Greater than or equals to (`=ge=`) : <code>GeNode</code>
* In (`=in=`) : <code>InNode</code>
* Not in (`=out=`) : <code>NotInNode</code>

#### <code>ExpNode(operator, children)</code>
A generic boolean expression
 
| Param     | Type                | Description                        | 
| --------- | ------------------- | ---------------------------------- |
| operator  | <code>string</code> | The custom operator                |
| children  | <code>Node[]</code> | The child nodes for the expression |

##### Subclasses
Standard boolean expression classes have been provided, and can be instantiated using <code>_ClassName_(children)</code>.
* And (`;`) : <code>AndNode</code>
* Or (`,`) : <code>OrNode</code>

#### <code>GroupNode(exp)</code>
Used to wrap parentheses around a boolean expression.

| Param     | Type                | Description                        | 
| --------- | ------------------- | ---------------------------------- |
| exp       | <code>ExpNode</code> | The boolean expression to wrap parentheses around                 |

## Examples

### JSON to FIQL

#### Example standard basic operator
```js
var eqJson = convertFromJson({
    equals : {
        selector: 'foo',
        args: 'bar'
    }
});
// eqJson = foo==bar
```

#### Example custom basic operator
```js
var customOperatorJson = convertFromJson({
    custom_operator : {
        operator: '¬',
        selector: 'foo',
        args: 'bar' 
    }
});
// customOperatorJson equals: foo¬bar 
```

#### Example standard boolean expression
```js
var andJson = convertFromJson({
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
```

#### Example custom boolean expression
```js
var customExpressionJson = convertFromJson({
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
```

#### Example grouping and nested arguments
```js
var groupJson = convertFromJson({
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
```

### Node to FIQL

#### Example standard basic operator
```js
var eqNode = convertFromNode(
    new EqNode(
        new LeafNode('foo'), 
        new LeafNode('bar')
    )
);
// eqNode = foo==bar
```

#### Example custom basic operator
```js
var customOperatorNode = convertFromNode(
    new OpNode(
        new LeafNode('foo'), 
        '¬', 
        new LeafNode('bar')
    )
);
// customOperatorNode equals: foo¬bar 
```

#### Example standard boolean expression
```js
var andNode = convertFromNode(
    new AndNode([
        new EqNode(
            new LeafNode('foo'), 
            new LeafNode('bar')
        ),
        new NeqNode(
            new LeafNode('baz'), 
            new LeafNode('qux')
        )
    ])
);
// andNode equals: foo==bar;baz!=qux
```

#### Example custom boolean expression
```js
var customExpressionNode = convertFromNode(
    new ExpNode('*', [
        new EqNode('foo', 'bar'),
        new NeqNode('baz', 'qux')
    ])
);
// customExpressionNode equals: foo==bar*baz!=qux
```

#### Example grouping and nested arguments
```js
var groupNode = convertFromNode(
    new EqNode(
        new LeafNode('k'),
        new GroupNode(
            new AndNode([
                new LtNode(
                    new LeafNode('foo'),
                    new LeafNode('bar')
                ),
                new NeqNode(
                    new LeafNode('baz'),
                    new LeafNode('qux')
                )
            ])
        )
    )
);
// groupNode equals: k==(foo=lt=bar,baz!=qux)
```

## License

This project is licensed under [MIT License](LICENCE)