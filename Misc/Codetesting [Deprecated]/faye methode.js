client.publish('/messages', { text: 'A new offer was posted' } )
.then(function(){
	console.log('Message received by server');
}, function(error) {
	console.log('There was an error publishing:' + error.message);
});
