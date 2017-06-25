var express = require('express');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var app = express();

var libraries = [
	{id: 1, name: "Stadtbücherei Gummersbach", standort: "Gummersbach"},
	{id: 2, name: "Bibliothek TH Köln", standort: "Gummersbach"},
	{id: 3, name: "Bibliothek Uni Paderborn", standort: "Paderborn"}
]

app.get('/', function(req, res){
	res.send('Hello World!');
});

app.get('/library/all', function(req, res){
	res.status(200).json(libraries);	
});

app.get('/library/:id', function(req, res){
	var id = req.params.id;
	
	var filteredData = libraries.filter(function(value, index, arr){
		return value.id == id;
	});
	
	if(filteredData.length >= 1){
		res.status(200).json(filteredData);	
	}
	else{
		res.status(404).end();	
	}
});

app.post('/library', jsonParser, function(req, res){
	libraries.push(req.body);
	res.type('plain').send('Added!');
});

app.listen(1337);