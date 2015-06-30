'use strict';

// MODULES //

var order = require( 'order-permutation' ),
	contains = require( 'validate.io-contains' ),
	isMissing = require( 'compute-ismissing/lib/array.js' ),
	sum = require( 'compute-sum' );


// FUNCTIONS //

var validate = require( './validate.js' );


// RANK //

/**
* FUNCTION: rank( x[, opts] )
*	Computes the sample ranks of the values of an array.
* @param {Array} x - input array
* @param {Object} [opts] - options object
* @param {String} [options.method] - method name determining how ties are treated
* @param {String} [opts.missing] - determines where missing values go: `first`,`last`, `remove`
* @param {Array} [opts.encoding=[null,NaN] ] - array of values encoding missing values
* @returns {Array} array of the same length as x, containing the computed ranks
*/
function rank( x, options ) {

	var opts = {}, err,
		n = x.length,
		ranks, ordered,
		tieRank,
		noDuplicates,
		iPlusOne,
		xnew, missingIndices, finalRanks, countMissing,
		totalNoTies = 0,
		i, j;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	opts.encoding = opts.encoding || [ null, NaN ];
	opts.missing = opts.missing || 'last';

 	xnew = [];
	for ( i = 0; i < n; i++ ) {
		if ( !contains( opts.encoding, x[ i ] ) ) {
			xnew.push( x[ i ] );
		}
	}
	missingIndices = new Array( x.length );
	isMissing( missingIndices, x, opts.encoding );

	x = xnew;
	n = x.length;

	opts.method = opts.method || 'average';
	ranks = new Array( n );

	ordered = order( x );

	if ( opts.method === 'ordinal' ) {
		for ( i = 0; i < n; i++ ) {
			ranks[ ordered[ i ] ] = i + 1;
		}
	} else {
		noDuplicates = 0;
		for ( i = 0; i < n; i++ ) {
			iPlusOne = i + 1;
			if ( ( i === n - 1 ) || ( x[ ordered[i] ] !== x[ ordered[ iPlusOne ] ] ) ) {
				switch ( opts.method ) {
					case 'average':
						tieRank = iPlusOne - 0.5 * noDuplicates;
					break;
					case 'min':
						tieRank = iPlusOne - noDuplicates;
					break;
					case 'max':
						tieRank = iPlusOne;
					break;
					case 'dense':
						tieRank = iPlusOne - noDuplicates - totalNoTies;
						totalNoTies += noDuplicates;
					break;
				}
				for ( j = i - noDuplicates; j < iPlusOne; j++ ) {
					ranks[ ordered[ j ] ] = tieRank;
				}
				noDuplicates = 0;
			} else {
				noDuplicates += 1;
			}
		}
	}

	if ( opts.missing === 'first' ) {
	 	countMissing = sum( missingIndices );
		j = 1;
		finalRanks = new Array( missingIndices.length );
		for ( i = 0; i < missingIndices.length; i++ ) {
			if ( missingIndices[ i ] === 1 ) {
				finalRanks[ i ] = j;
				j += 1;
			} else {
				finalRanks[ i ] = ranks.shift() + countMissing;
			}
		}
		return finalRanks;
	}
	if ( opts.missing === 'last' ) {
		finalRanks = new Array( missingIndices.length );
		for ( i = 0; i < missingIndices.length; i++ ) {
			if ( missingIndices[ i ] === 1 ) {
				finalRanks[ i ] = i + ranks.length + 1;
			} else {
				finalRanks[ i ] = ranks.shift();
			}
		}
		return finalRanks;
	}
	// when opts.missing = 'remove'
	return ranks;
} // end FUNCTION rank()


// EXPORTS //

module.exports = rank;
