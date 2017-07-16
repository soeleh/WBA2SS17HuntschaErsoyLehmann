var faye = require('faye');

var client = new faye.client('http://localhost:1337');

client.subscribe('/messages', function(message){
	console.log('Got a new message: ' + message.text);
});

client.publish('/messages', {
	text: 'There is a new offer available'
});