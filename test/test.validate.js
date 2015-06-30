/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
chai = require( 'chai' ),

// Module to be tested:
validate = require( './../lib/validate.js' );


// VARIABLES //

var expect = chai.expect,
assert = chai.assert;

// TESTS //

describe( 'validate', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should return an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( validate( {}, values[ i ] ) instanceof TypeError );
		}
	});

	it( 'should return an error if provided an encoding option which is not an array', function test() {
		var values, err;

		values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'encoding': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a method option which is not one of the specified methods', function test() {
		var values, err;

		values = [
			'maximal',
			'5',
			5,
			[],
			false,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'method': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a missing option which is not either `first`, `last` or `remove`', function test() {
		var values, err;

		values = [
			'remover',
			'5',
			5,
			[],
			false,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'missing': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});


	it( 'should return null if all options are valid', function test() {
		var err;

		err = validate( {}, {
			'method': 'average',
			'missing': 'first',
			'encoding': [ null, NaN ]
		});

		assert.isNull( err );
	});

});
