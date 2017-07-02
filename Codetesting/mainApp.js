// Modules
const express = require('express');
const bodyParser = require('body-parser');

// Access Variables
const app = express();
const jsonParser = bodyParser.json();

// Settings
const settings = {
	port: 3000
};

//Testing instead of using Google's API
var citytesting = [
	{id: 1, city: "Gummersbach", 	rent: 	450, renttype: "warm", size: 9,  roomqty: 1},
	{id: 2, city: "Köln", 			rent: 	400, renttype: "warm", size: 49, roomqty: 2},
	{id: 3, city: "Grevenbroich", 	rent:	300, renttype: "kalt", size: 75, roomqty: 4},
	{id: 4, city: "Köln", 			rent: 	500, renttype: "warm", size: 53, roomqty: 2}
]

// GET REQUESTS
// Test Request
app.get('/', function(req, res){
	res.send('Hello World!');
});

// Show all the available offers
app.get('/offers/all', function(req,res){

	res.status(200).json(citytesting);	
});

// Show specific ID
app.get('/offers/:id', function (req, res) {
    
	var id = req.params.id;
	
	var filteredData = citytesting.filter(function(value, index, arr){
		return value.id == id;
	});
	
	if(filteredData.length >= 1){
		res.status(200).json(filteredData);	
	}
	else{
		 var message = {
                "error": {
                    "message": "Anzeige mit der ID " + req.params.id + " nicht gefunden!"
                }
            }
            res.status(404).json(message);	
	}
});
// Filter by cities
app.get('/offers/city/:city', function (req, res) {
    
	var city = req.params.city;
	
	var filteredData = citytesting.filter(function(value, index, arr){
		return value.city == city;
	});
	
	if(filteredData.length >= 1){
		res.status(200).json(filteredData);	
	}
	else{
		 var message = {
                "error": {
                    "message": "Keine Anzeigen in " + req.params.city + " gefunden!"
                }
            }
            res.status(404).json(message);	
	}
});

// Filter the City by Room Size
app.get('/offers/city/:city/size/:size', function (req, res) {
    
	var city = req.params.city;
	
	var filteredData = citytesting.filter(function(value, index, arr){
		return value.city == city;
	});
	
	if(filteredData.length >= 1){
			var size = req.params.size;

			var aFilteredData = citytesting.filter(function(value, index, arr){
				if( value.city == city && value.size <= size){
					return value.city == city;
					return value.size == size;
				}
			});
	
			if(aFilteredData.length >= 1){
				res.status(200).json(aFilteredData);	
			}
			else{
				 var message = {
		                "error": {
		                    "message": "Keine Anzeigen in " + req.params.city + " mit der Maximalgröße von " + req.params.size + " Quadratmeter gefunden!"
		                }
		            }
		            res.status(404).json(message);	
			}
	}
	else{
		 var message = {
                "error": {
                    "message": "Keine Anzeigen in " + req.params.city + " gefunden!"
                }
            }
            res.status(404).json(message);	
	}
});
// Filter the City by Room Quantity
app.get('/offers/city/:city/roomqty/:roomqty', function (req, res) {
    
	var city = req.params.city;
	
	var filteredData = citytesting.filter(function(value, index, arr){
		return value.city == city;
	});
	
	if(filteredData.length >= 1){
			var roomqty = req.params.roomqty;

			var aFilteredData = citytesting.filter(function(value, index, arr){
				if( value.city == city && value.roomqty == roomqty){
					return value.city == city;
					return value.roomqty == roomqty;
				}
			});
	
			if(aFilteredData.length >= 1){
				res.status(200).json(aFilteredData);	
			}
			else{
				 var message = {
		                "error": {
		                    "message": "Keine Anzeigen in " + req.params.city + " mit der Raumanzahl von " + req.params.roomqty + " gefunden!"
		                }
		            }
		            res.status(404).json(message);	
			}
	}
	else{
		 var message = {
                "error": {
                    "message": "Keine Anzeigen in " + req.params.city + " gefunden!"
                }
            }
            res.status(404).json(message);	
	}
});
//Filter the City by Rent Type
app.get('/offers/city/:city/renttype/:renttype', function (req, res) {
    
	var city = req.params.city;
	
	var filteredData = citytesting.filter(function(value, index, arr){
		return value.city == city;
	});
	
	if(filteredData.length >= 1){
			var renttype = req.params.renttype;

			var aFilteredData = citytesting.filter(function(value, index, arr){
				if( value.city == city && value.renttype == renttype){
					return value.city == city;
					return value.renttype == renttype;
				}
			});
	
			if(aFilteredData.length >= 1){
				res.status(200).json(aFilteredData);	
			}
			else{
				 var message = {
		                "error": {
		                    "message": "Keine Anzeigen in " + req.params.city + " mit der Mietart " + req.params.renttype + " gefunden!"
		                }
		            }
		            res.status(404).json(message);	
			}
	}
	else{
		 var message = {
                "error": {
                    "message": "Keine Anzeigen in " + req.params.city + " gefunden!"
                }
            }
            res.status(404).json(message);	
	}
});
//Filter the City and Rent Type by Rent Amount
app.get('/offers/city/:city/renttype/:renttype/rent/:rent', function (req, res) {
var city = req.params.city;
	
	var filteredData = citytesting.filter(function(value, index, arr){
		return value.city == city;
	});
    
    if(filteredData.length >= 1){
			var rent = req.params.rent;

			var aFilteredData = citytesting.filter(function(value, index, arr){
				if( value.city == city && value.renttype == renttype){
					return value.city == city;
					return value.renttype == renttype;
				}
			});
	
			if(aFilteredData.length >= 1){
				res.status(200).json(aFilteredData);	
			}
			else{
				 var message = {
		                "error": {
		                    "message": "Keine Anzeigen in " + req.params.city + " mit der Miete " + req.params.rent + " gefunden!"
		                }
		            }
		            res.status(404).json(message);	
			}
	}
	else{
		 var message = {
                "error": {
                    "message": "Keine Anzeigen in " + req.params.city + " gefunden!"
                }
            }
            res.status(404).json(message);	
	}
});







//Add another ad
//app.post('/offers', jsonParser, function(req, res){
//	citytesting.push(req.body);
//	res.type('plain').send('Added!');
//});


//Delete an existing ad
//app.delete("/offers/:id", function(req,res){
//	res.send("DEL /offers/:id")
//});

app.listen(settings.port, function(){
	console.log("Service is running on port "+settings.port+".");
});