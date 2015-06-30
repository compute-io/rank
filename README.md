rank
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes ranks for values of an array.


## Installation

``` bash
$ npm install compute-rank
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var rank = require( 'compute-rank' );
```

#### rank( arr[, opts] )

Returns the sample ranks of elements in `arr`, which can be an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) or [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays).

```javascript
rank( [ 1.1, 2, 3.5, 0, 2.4 ] );
// returns [ 2, 3, 5, 1, 4 ]

// ties are averaged:
rank ( [ 2, 2, 1, 4, 3 ] );
// returns [ 2.5, 2.5, 1, 5, 4 ];

// missing values are placed last:
rank( [ null, 2, 2, 1, 4, 3, NaN, NaN ] );
// returns [ 6, 2.5, 2.5, 1, 5, 4, 7 ,8 ]
```

The function accepts the following options:

*  __method__: `string` indicating how ties are handled. Can be one of the following values: `'average'`, `'min'`, `'max'`, `'ordinal'` and `'dense'`.  Default: `'average'`.
*  __missing__: `string` specifying how missing values are handled. Must be either `'last'`, `'first'` or `'remove'`. Default: `'last'`.
* __encoding__: `array` holding all values which will be regarded as missing values. Default: `[ NaN, null]`.

When all elements of the `array` are different, the ranks are uniquely determined. When there are equal elements (called *ties*), the `method` option determines how they are handled. The default, `'average'`, replace the ranks of the ties by their mean. Other possible options are `'min'` and `'max'`, which replace the ranks of the ties by their minimum and maximum, respectively. `'dense'` works like `'min'`, with the difference that the next highest element after a tie is assigned the next smallest integer. Finally, `ordinal` gives each element in `arr` a distinct rank, according to the position they appear in.

```javascript
var data, out;

data = [ 2, 2, 1, 4, 3 ];

// max method
out = rank( data, {
	'method': 'max'
});
// returns [ 3, 3, 1, 5, 4 ]

// min method
out = rank( data, {
	'method': 'min'
});
// returns [ 2, 2, 1, 5, 4 ]

// ordinal method
out = rank( data, {
	'method': 'ordinal'
});
// returns [ 2, 3, 1, 5, 4 ]

// dense method
out	 = [ 2, 2, 1, 4, 3 ];
out = rank( data, {
	'method': 'dense'
});
// returns [ 2, 2, 1, 4, 3 ]
```

The `missing` option is used to specify how to handle missing data. By default, `NaN` or `null` are treated as missing values. `'last'`specifies that missing values are placed last, `'first'` that the are assigned the lowest ranks and `'remove'` means that they are removed from the array before the ranks are calculated.

```javascript
var data, out;

data = [ NaN, 2, 2, 1, 4, 3, null, null ];

out = rank( data, {
	'missing': 'first'
});
// returns [ 1, 5.5, 5.5, 4, 8, 7, 2, 3 ]

out = rank( data, {
	'missing': 'last'
});
// returns [ 6, 2.5, 2.5, 1, 5, 4, 7 ,8 ]

out = rank( data, {
	'missing': 'remove'
});
// returns [ 2.5, 2.5, 1, 5, 4 ]
```

Custom encoding for missing values is supported via the `encoding` option, which allows to supply the function with an `array` of values which should be treated as missing.

```javascript
var data, out;

data = new Int32Array( [ 2, 1, -999, 3, 4 ] );

out = rank( data, {
	'encoding': [ -999 ]
})
// returns [ 2, 1, 5, 3, 4 ]
```

## Examples

``` javascript
var rank = require( 'compute-rank' );

var data, i, out;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*10 );
}

out = rank( data );

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 10;
}

out = rank( data );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.

[npm-image]: http://img.shields.io/npm/v/compute-rank.svg
[npm-url]: https://npmjs.org/package/compute-rank

[travis-image]: http://img.shields.io/travis/compute-io/rank/master.svg
[travis-url]: https://travis-ci.org/compute-io/rank

[coveralls-image]: https://img.shields.io/coveralls/compute-io/rank/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/rank?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/rank.svg
[dependencies-url]: https://david-dm.org/compute-io/rank

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/rank.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/rank

[github-issues-image]: http://img.shields.io/github/issues/compute-io/rank.svg
[github-issues-url]: https://github.com/compute-io/rank/issues
