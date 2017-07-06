// Modules
global.express = require('express');
global.bodyParser = require('body-parser');
global.fs = require('fs');
global.async = require('async');
global.redis = require('redis');
global.Validator = require('jsonschema').Validator;

// Access variables
global.app = express();
global.jsonParser = bodyParser.json();
global.v = new Validator();
global.db = redis.createClient();
app.use(jsonParser);

// Settings
const settings = {
	port: process.env.PORT || 3000,
};

// JSON scheme
var offerScheme = {
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
    "required": ["id", "city", "rent", "renttype", "size", "roomqty"],
    "additionalProperties": false
};

v.addSchema(offerScheme, '/oneOffer');

/*-------Offer example-------
{
	"id": 			1, 
	"city": 		"Gummersbach", 	
	"rent": 		450, 
	"renttype": 	"warm", 
	"size": 		9,  
	"roomqty": 		1
}
*/

//Add data

//Offers
var data_offers = require('./data/offers.js');
data_offers.init(app);

//Testdata
var data_testdata = require('./data/testdata.js');
data_testdata.init(app);


//Starting the app
app.listen(settings.port, function(){
	console.log("Service is running on port "+settings.port+".");
});