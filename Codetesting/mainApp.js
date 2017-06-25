// Bind Modules
var express = require("express");
var bodyParser = require('body-parser');

// Bind variable to Object for access
var app = express();
var jsonParser = bodyParser.json();

// Constant variables for Settings
const settings = {
	port: 3000
	// additional settings
};

//Testing instead of using Google's API
var citytesting = [
	{id: 1, city: "Gummersbach", 	rent: 	450, renttype: "warm", size: 9,  roomqty: 1},
	{id: 2, city: "Köln", 			rent: 	400, renttype: "warm", size: 49, roomqty: 2},
	{id: 3, city: "Grevenbroich", 	rent:	300, renttype: "kalt", size: 75, roomqty: 4}
]

//Errorhandling
app.use(function(err,req,res,next)){}


//Testfunction
app.get('/', function(req, res){
	res.send('Hello World!');
});


//Log mit Pfad und Zeitangabe für jeden Request-Pfad
app.use(function(req,res,next)){}

//Routing

//Bind Path to Constante
const user = require('./user');
//Mounting Router for "user" in mainApp
app.use("/user".user)

//Methodes

// GET Request on Path "/"
app.get("/", function(req,res)){
	res.status(200).json(citytesting);	
});
// POST Request on Path "/"
app.post('/', jsonParser, function(req, res){
	citytesting.push(req.body);
	res.type('plain').send('Added!');
});


// GET Request on Path "/offers"
app.get("/offers", function(req,res)){
	var offers = req.params.offer;
	
	var filteredData = citytesting.filter(function(value, index, arr){
		return value.offers == offers;
	});
	
	if(filteredData.length >= 1){
		res.status(200).json(filteredData);	
	}
	else{
		res.status(404).end();	
	}
});
// POST Request on Path "/offers"
app.post("/offers", function(req,res))


// GET Request on Path "/offers/:id"
app.get("/offers", function(req,res)){
	var offers = req.params.offers;
	
	var filteredData = citytesting.filter(function(value, index, arr){
		return value.offers == offers;
	});
	
	if(filteredData.length >= 1){
		res.status(200).json(filteredData);	
	}
	else{
		res.status(404).end();	
	}
});
// DEL Request on Path "/offers/:id"
app.del("/offers/:id", function(req,res){
	res.send("DEL /offers/:id")
});
// GET Request on Path "/offers/:city"
app.get("/offers/:city", function(req,res)){
	var city = req.params.city;
	
	var filteredData = citytesting.filter(function(value, index, arr){
		return value.city == city;
	});
	
	if(filteredData.length >= 1){
		res.status(200).json(filteredData);	
	}
	else{
		res.status(404).end();	
	}
});


// GET Request on Path "/offers/:city/:size"
app.get("/offers/:city/:size", function(req,res)){
	var size = req.params.size;
	
	var filteredData = citytesting.filter(function(value, index, arr){
		return value.size == size;
	});
	
	if(filteredData.length >= 1){
		res.status(200).json(filteredData);	
	}
	else{
		res.status(404).end();	
	}
});
// GET Request on Path "/offers/:city/:rent"
app.get("/offers/:city/:rent", function(req,res)){
	var rent = req.params.rent;
	
	var filteredData = citytesting.filter(function(value, index, arr){
		return value.rent == rent;
	});
	
	if(filteredData.length >= 1){
		res.status(200).json(filteredData);	
	}
	else{
		res.status(404).end();	
	}
});
// GET Request on Path "/offers/:city/:renttype"
app.get("/offers/:city/:renttype", function(req,res)){
	var renttype = req.params.offer;
	
	var filteredData = citytesting.filter(function(value, index, arr){
		return value.renttype == renttype;
	});
	
	if(filteredData.length >= 1){
		res.status(200).json(filteredData);	
	}
	else{
		res.status(404).end();	
	}
});
// GET Request on Path "/offers/:city/:roomqty"
app.get("/offers/:city/:roomqty", function(req,res)){
	var roomqty = req.params.roomqty;
	
	var filteredData = citytesting.filter(function(value, index, arr){
		return value.roomqty == roomqty;
	});
	
	if(filteredData.length >= 1){
		res.status(200).json(filteredData);	
	}
	else{
		res.status(404).end();	
	}
});

app.listen(settings.port, function(){
	console.log("Service is running on port"+settings.port+".");
});