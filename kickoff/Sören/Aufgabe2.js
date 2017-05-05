var fs = require('fs');
var chalk=require('chalk');

fs.readFile("staedte.json", function(err, data) {
	var obj = JSON.parse(data);
	for(var i=0;i<20;i++){
	console.log(chalk.grey.bgWhite("name:"+obj.stadte[i].name));
	console.log(chalk.red("country: "+obj.staedte[i].country));
	console.log(chalk.yellow("population: "+obj.staedte[i].population));
	console.log("--------------------");	
	}
});