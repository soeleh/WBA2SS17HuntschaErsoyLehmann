var fs = require('fs');
var chalk=require('chalk');

fs.readFile("staedte.json", function(err, data) {
	var obj = JSON.parse(data);
	obj.staedte.sort(function (a, b) {
		if (a.population < b.population) {
			return 1;
		}
		if(a.population > b.population) {
			return -1;
		}
	fs.writeFile('staedte_sortiert.json', data, function(err){});
	});

	for(var i=0;i<20;i++){
	console.log(chalk.black.bgWhite("name:"+obj.staedte[i].name));
	console.log(chalk.red("country: "+obj.staedte[i].country));
	console.log(chalk.yellow("population: "+obj.staedte[i].population));
	console.log("--------------------");	
	}
});