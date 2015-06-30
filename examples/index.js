'use strict';

var rank = require( './../lib' );

var data, i, out;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*10 );
}

out = rank( data );
console.log( out );

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 10;
}

out = rank( data );
console.log( out );
