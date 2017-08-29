// Modules
var express = require('express'),
    bodyParser = require('body-parser'),
    async = require('async'),
    fs = require('fs'),
    validator = require('jsonschema').Validator;

// Access variables
var app = express();
global.v = new validator();

var offers = require('./offers');
app.use('/offers', offers);

// JSON scheme
global.offerScheme = {
    "id": "/oneOffer",
    "type": "object",
    "properties": {
        "id": { "type": "number" },
        "city": { "type": "string" },
        "rent": {"type": "number"},
        "renttype": { "type": "string" },
        "size": {"type": "number"},
        "roomqty": {"type": "number"}
    },
    "required": ["id", "city", "rent", "renttype", "size", "roomqty"]
};

v.addSchema(offerScheme, '/oneOffer');

// Settings for given Port or Port 3000
const settings = {
	port: process.env.PORT || 3000
};

/*In-memory data module
global.data = require("./data");
*/

/*Read data from disk to memory
async.waterfall([

		function(callback){
			fs.readFile(settings.datafile, 'utf8', function(err, filestring) { callback(null, err, filestring); });
    },

		function(err, filestring, callback) {
			if (err!= null) { callback(null, false); }
			else {
				data.offers = JSON.parse(filestring).offers;
        callback(null, true);
			}
		 }
   ],
		function(err, success){
      if(err!== null) { success = false; }
			console.log('Offer data '+(success ? 'successfully' : 'unsuccessfully')+' loaded.');
		});
*/
//Starting the app
app.listen(settings.port, function(){
	console.log("Service is running on port "+settings.port+".");
});
