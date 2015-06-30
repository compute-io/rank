/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	rank = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-rank', function tests() {

	it( 'should export a function', function test() {
		expect( rank ).to.be.a( 'function' );
	});

	it( 'should throw an error if `options` is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				rank( [1,2,3,4,5], value );
			};
		}
	});

	it( 'should calculate the ranks for a simple array without missing values', function test() {
		var data, actual, expected;

		data = [ 2, 1, 4, 3 ];
		actual = rank ( data );
		expected = [ 2, 1, 4, 3 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should calculate the ranks for an array with tied values using the default method (=average)', function test() {
		var data, actual, expected;

		data = [ 2, 2, 1, 4, 3 ];
		actual = rank ( data );
		expected = [ 2.5, 2.5, 1, 5, 4 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should calculate the ranks for an array with tied values and missing values', function test() {
		var data, actual, expected;

		data = [ null, 2, 2, 1, 4, 3, NaN, NaN ];
		actual = rank ( data );
		expected = [ 6, 2.5, 2.5, 1, 5, 4, 7 ,8 ];

		assert.deepEqual( actual, expected );
	});


	it( 'should calculate the ranks for an array with tied values using a custom method', function test() {
		var data, actual, expected;

		// max method
		data = [ 2, 2, 1, 4, 3 ];
		actual = rank( data, {
			'method': 'max'
		});
		expected = [ 3, 3, 1, 5, 4 ];
		assert.deepEqual( actual, expected );

		// min method
		data = [ 2, 2, 1, 4, 3 ];
		actual = rank( data, {
			'method': 'min'
		});
		expected = [ 2, 2, 1, 5, 4 ];
		assert.deepEqual( actual, expected );

		// ordinal method
		data = [ 2, 2, 1, 4, 3 ];
		actual = rank( data, {
			'method': 'ordinal'
		});
		expected = [ 2, 3, 1, 5, 4 ];
		assert.deepEqual( actual, expected );

		// dense method
		data = [ 2, 2, 1, 4, 3 ];
		actual = rank( data, {
			'method': 'dense'
		});
		expected = [ 2, 2, 1, 4, 3 ];
		assert.deepEqual( actual, expected );
	});

	it( 'should calculate the ranks for an array with tied values using all three strategies to handle missing values', function() {
		var data, actual, expected;
		// put missing values in front
		data = [ NaN, 2, 2, 1, 4, 3, null, null ];
		actual = rank( data, {
			'missing': 'first'
		});
		expected = [ 1, 5.5, 5.5, 4, 8, 7, 2, 3 ];
		assert.deepEqual( actual, expected );

		// put missing values last
		data = [ NaN, 2, 2, 1, 4, 3, null, null ];
		actual = rank( data, {
			'missing': 'last'
		});
		expected = [ 6, 2.5, 2.5, 1, 5, 4, 7 ,8 ];
		assert.deepEqual( actual, expected );

		// remove missing values
		data = [ NaN, 2, 2, 1, 4, 3, null, null ];
		actual = rank( data, {
			'missing': 'remove'
		});
		expected = [ 2.5, 2.5, 1, 5, 4 ];
		assert.deepEqual( actual, expected );

	});

});
