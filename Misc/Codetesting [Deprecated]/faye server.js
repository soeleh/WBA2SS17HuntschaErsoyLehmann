//faye server
var http = require('http'),
	faye = require('faye');
	
// Server
var fayeserver = http.createServer();
	
// Node Adapter
var fayeservice = new faye.NodeAdapter({
	mount: '/mount'
	timeout: 45
});

fayeservice.attach(fayeserver);
	