// Modules
var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');
var Validator = require('jsonschema').Validator;

// Access variables
const app = express();
const jsonParser = bodyParser.json();
const v = new Validator();
const db = redis.createClient();
app.use(jsonParser);

// Settings
const settings = {
	port: 3000
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

// Test request
app.get('/', function(req, res){

	res.send('Hello World!');

});

// Show all offers
app.get('/offers', function (req, res) {

    res.status(200).json(offers);

});

// Filter by id
app.get('/offers/:id', function (req, res) {

    db.get('offers:' + req.params.id, function (err, rep) {

        if (rep) {
            res.status(200).json(rep);
        }
        else {
            var message = {
                "error": {
					"message": "Could not find offer with ID " + req.params.id + "!"
				}
            }
            res.status(404).json(message);
        }

    });

});

// Filter by city
app.get('/offers/:city', function (req, res) {

    db.get('offer:' + req.params.city, function (err, rep) {

        if (rep) {
            var city = req.params.city;
			var filteredData = db.filter(function(value, index, arr){
			return value.city == city;
			});
			
			if(filteredData.length >= 1){
				res.status(200).json(filteredData);	
			}
			else{
				 var message = {
		                "error": {
		                    "message": "Could not find offer in " + req.params.city + "!"
		                }
		            }
		            res.status(404).json(message);	
			}
		}
		else {
            res.status(404).json(message);
        }

	});

});

// Filter by renttype
app.get('/offers/:city/:renttype', function (req, res) {

    db.get('offer:' + req.params.city, function (err, rep) {

        if (rep) {
            var city = req.params.city;
			var filteredData = db.filter(function(value, index, arr){
			return value.city == city;
			});
			
			if(filteredData.length >= 1){
				db.get('offer:' + req.params.renttype, function (err, rep) {
				    if (rep) {
	            		var renttype = req.params.renttype;
						var aFilteredData = db.filter(function(value, index, arr){
							return value.renttype == renttype;
						});
						
						if(aFilteredData.length >= 1){
							res.status(200).json(aFilteredData);	
						}
					}
					else{
		 				var message = {
           		    		"error": {
                    			"message": "Could not find offer with " + req.params.renttype + " renttype!"
                			}
            			}            
            			res.status(404).json(message);	
            		}
            	});
			}

			else{
			 	var message = {
	                "error": {
	                    "message": "Could not find offer in " + req.params.city + "!"
	                }
	            }
	            res.status(404).json(message);	
			}
		}
		else {
            res.status(404).json(message);
        }
	});

});

// Filter by room quantity
app.get('/offers/:city/rooms/:roomqty', function (req, res) {

    db.get('offer:' + req.params.city, function (err, rep) {

        if (rep) {
            var city = req.params.city;
			var filteredData = db.filter(function(value, index, arr){
			return value.city == city;
			});
			
			if(filteredData.length >= 1){
				db.get('offer:' + req.params.roomqty, function (err, rep) {
				    if (rep) {
	            		var roomqty = req.params.roomqty;
						var aFilteredData = db.filter(function(value, index, arr){
							return value.roomqty == roomqty;
							});
						if(aFilteredData.length >= 1){
							res.status(200).json(aFilteredData);	
						}
						else{
			 				var message = {
	           		    		"error": {
	                    			"message": "Could not find offer with " + req.params.roomqty + " rooms!"
	                			}
	            			}            
	            			res.status(404).json(message);	
	            		}
	            	}
	            });	
			}
			else{
			 	var message = {
	                "error": {
	                    "message": "Could not find offer in " + req.params.city + "!"
	                }
	            }
	            res.status(404).json(message);	
			}
		}
		else {
            res.status(404).json(message);
        }

	});

});

// Filter by size
app.get('/offers/:city/size/:size', function (req, res) {

    db.get('offer:' + req.params.city, function (err, rep) {

        if (rep) {
            var city = req.params.city;
			var filteredData = db.filter(function(value, index, arr){
			return value.city == city;
			});
			
			if(filteredData.length >= 1){
				db.get('offer:' + req.params.size, function (err, rep) {
				    if (rep) {
	            		var size = req.params.size;
						var aFilteredData = db.filter(function(value, index, arr){
							return value.size == size;
						});
						if(aFilteredData.length >= 1){
							res.status(200).json(aFilteredData);	
						}
						else{
			 				var message = {
	           		    		"error": {
	                    			"message": "Could not find offer with up to " + req.params.size + " square meters size!"
	                			}
	            			}            
	            			res.status(404).json(message);	
	            		}
	            	}
            	});	
			}
			
			else{
			 	var message = {
		            "error": {
		                "message": "Could not find offer in " + req.params.city + "!"
		            }
		        }
		    	res.status(404).json(message);	
			}
		}
		else {
            res.status(404).json(message);
        }

	});

});

//Filter by rent
app.get('/offers/:city/:renttype/:rent', function (req, res) {

    db.get('offer:' + req.params.city, function (err, rep) {

        if (rep) {
            var city = req.params.city;
			var filteredData = db.filter(function(value, index, arr){
			return value.city == city;
			});
			
			if(filteredData.length >= 1){
				db.get('offer:' + req.params.renttype, function (err, rep) {
				    if (rep) {
	            		var renttype = req.params.renttype;
						var aFilteredData = db.filter(function(value, index, arr){
							return value.renttype == renttype;
						});

						if(aFilteredData.length >= 1){
							db.get('offer:' + req.params.rent, function (err, rep) {
					    		if (rep) {
				            		var rent = req.params.rent;
									var bFilteredData = db.filter(function(value, index, arr){
										return value.rent == rent;
									});
									if(bFilteredData.length >= 1){
										res.status(200).json(bFilteredData);	
									}
									else{
						 				var message = {
				           		    		"error": {
				                    			"message": "Could not find offer with up to " + req.params.rent + " rent!"
				                			}
				            			}            
		            				res.status(404).json(message);	
	            					}
	            				}
	            			});	
						}

						else{
					 		var message = {
			                	"error": {
			                    	"message": "Could not find offer with rent type " + req.params.renttype + "!"
			                	}
			            	}
			            	res.status(404).json(message);	
						}
					}
            	});
            }	

			else{
			 	var message = {
	                "error": {
	                    "message": "Could not find offer in " + req.params.city + "!"
	                }
	            }
	            res.status(404).json(message);	
			}
		}
		else {
            res.status(404).json(message);
        }

	});

});

// Send new offer
app.post('/offers', function (req, res) {

    if (!res.body) {
        var message = {
            "error": {
                "message": "Missing Body text!"
            }
        }
        return res.status(400).json(message);
    }

    var newOffer = req.body;

    // Validates new offer

    var value= v.validate(newOffer, offerSchema);

    // If true, post new offer
    if (value.valid) {
        db.incr('id:offers', function (err, rep) {

            newOffer.id = rep;

            db.set('offer:' + newOffer.id, JSON.stringify(newOffer), function (err, rep) {

                res.header('Location', '/offers/'+newOffer.id).status(201).json(newOffer);

            });

        });
    }
    else {
        res.status(400).json(value.errors);
    }

});

// Change offer
app.put('/offers', function (req, res) {

    if (!res.body) {
        var message = {
            "error": {
                "message": "Missing Body text!"
            }
        }
        return res.status(400).json(message);
    }

    // Validates new offer

    var value= v.validate(req.body, offerSchema);

    if (value.valid) {

	    // If true, change new offer
	    db.exists('offer:' + req.params.id, function (err, rep) {
	        if (rep == 1) {
	            var updatedOffer = req.body;
	            updatedOffer.id = req.params.id;
	            db.set('offer:' + req.params.id, JSON.stringify(updatedOffer), function (err, rep) {
	                res.status(200).json(updatedOffer);
	            });
	        }
	        else {
	            var message = {
	                "error": {
	                    "message": "Could not find offer with ID " + req.params.id + "!"
	                }
	            }
	            res.status(404).json(message);
	        }
	    });
	}
	    
    else {
        res.status(400).json(value.errors);
    }

});

// Delete specific offer
app.delete('/offers/:id', function (req, res) {

    db.del('offer:' + req.params.id, function (err, rep) {
        if (rep == 1) {
            var message = {
                "success": {
                    "message": "Success! Deleted offer with the ID " + req.params.id + "!"
                }
            }
            res.status(200).json(message);
        }
        else {
            var message = {
                "error": {
                    "message": "Could not find the ID " + req.params.id + " in the data base!"
                }
            }
            res.status(404).json(message);
        }
    });

});


app.listen(settings.port, function(){
	console.log("Service is running on port "+settings.port+".");
});