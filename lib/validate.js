'use strict';

// MODULES //

var contains = require( 'validate.io-contains' ),
	isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isString = require( 'validate.io-string-primitive' );


// VARIABLES //

var METHODS = [ 'min', 'max', 'average', 'dense', 'ordinal' ];
var MISSING = [ 'last', 'first', 'remove' ];


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {String} [options.method] - method determining how ties are treated
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'rank()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'encoding' ) ) {
		opts.encoding = options.encoding;
		if ( !isArray( opts.encoding ) ) {
			return new TypeError( 'rank()::invalid option. Encoding option must be an array. Option: `' + opts.encoding + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'method' ) ) {
		opts.method = options.method;
		if ( !isString( opts.method ) || !contains( METHODS, opts.method )  ) {
			return new TypeError( 'rank()::invalid option. Method must be one of the following values: `average`, `min`, `max`, `dense` or `ordinal`. Option: `' + opts.method + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'missing' ) ) {
		opts.missing = options.missing;
		if ( !isString( opts.missing ) || !contains( MISSING, opts.missing )  ) {
			return new TypeError( 'rank()::invalid option. Missing must be one of the following values: `last`, `first`` or `remove`. Option: `' + opts.missing + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
