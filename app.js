"use strict";

function init() {
	Homey.log("Hello world!");
}
	// this is fired when a flow with this trigger has been found, and has extra arguments
	Homey.manager('flow').on('trigger.programmatic_trigger',  function( callback, args, state) {
			Homey.log('The Trigger got Triggered ');
		  console.log(state); // { 'location': 'Amsterdam' }, this is the state parameter, as passed in trigger()
		  console.log(args); // { 'location': 'New York' }, this is the user input
			if( true ) {
					callback( null, true ); // If true, this flow should run. The callback is (err, result)-style.
					Homey.log('The Trigger got Triggered2 ');
			} else {
					callback( null, false );
			}
			// return args.myLog
	})

// for Trigger-the-trigger
Homey.manager('flow').on('action.programmatic_trigger', function( callback, args ) {
		// Trigger the programmatic_trigger
	  Homey.log('Trigger the Trigger 1 ');
	  var myLog = "Hello world!!";
		var tokens = { 'myLog': myLog };
		var state = { 'location': 'Amsterdam' };
		// console.log(tokens);
		Homey.manager('flow').trigger('programmatic_trigger', tokens, state,   function(err, result){
  	if( err ) {
				Homey.log('Trigger the Trigger -Homey Error ');
 				return Homey.error(err)}
	  } );
    callback( null, true );
});
module.exports.init = init;
