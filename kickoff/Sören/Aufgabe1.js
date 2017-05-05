var fs = require('fs');
fs.readFile("staedte.json", function(err, data) {
	var obj = JSON.parse(data);
	for(var i=0;i<20;i++){
	console.log("name:"+obj.staedte[i].name);
	console.log("country: "+obj.staedte[i].country);
	console.log("population: "+obj.staedte[i].population);
	console.log("--------------------");	
	}
});