// Get Change(Put) Delete	specific Offers + + +
// Get 				 		all 	 Offers +
// Post				 		specific Offers ?		

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var async = require("async");
var faye = require('faye');

/* * * * * * * * *
 *  Initializing *
 *  Node Modules *
 * * * * * * * * */

//express
var app = express();
//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
//cookie.parser
app.use(cookieParser());
//socket.io
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);
//Faye
var fayeserver = http.createServer();

/* * * * * * * *
 *   Settings  *
 * * * * * * * */

app.use(express.static(__dirname + '/data'));
app.set('view engine', 'ejs');

const settings = {
	port: 1337,
	httpport: 1338
};

/* * * * * * * *
 *   Homepage  *
 * * * * * * * */

app.get('/', function (req, res) {
    res.render('../data/pages/index');
});

/* * * * * * * * *
 *   Ressources  *
 * * * * * * * * */

/* * * * * * * *
 *  Socket.io  *
 * * * * * * * */
 
var clientsSocket = [];
// When Problems appear with CORS
// io.set('origins','*');
io.on('connection', function(socket){
	// ClientSocket added to Socket-List
	clientSockets.push(socket);
	console.log('Connection success!');
	
	socket.on('message', function(data){
		console.log('msg:', data);
		// Redirect (clients) Message to other Clients
		clientSockets.forEach(function(clientSocket){
			clientSocket.send(data);
		});
	});
	// Remove ClientSocket out of Socket-List when it disconnects
	socket.on('disconnect', function(){
		console.log('Conection disconnected!');
		clientSockets.splice(ClientSockets.indexOf(Socket),1);
	});
});
httpServer.listen(settings.httpport);

/* * * * * * *
 *   Faye    *
 * * * * * * */
 
var fayeservice = new faye.NodeAdapter({
	mount: '/faye',
	timeout: 45
});

fayeservice.attach(fayeserver);

//Serverside Client
var client = new faye.Client('http://localhost:'+ settings.port +'/faye');
client.subscribe('/messages', function(message){
	console.log('Got a new message: ' + message.text + '!');
});

// Methodes

/* * * * * * *
 * Userarea  *
 * * * * * * */

app.get('/user', function (req, res) {

    if (req.cookies.loggedin === 'true') {

        async.waterfall([
			// Get all Offers
            function (callback) {

                var options = {
                    host: 'localhost',
                    port: '1337',
                    path: '/offers',
                    method: 'GET',
                    headers: {
                        accept: 'application/json'
                    }
                }

                var externalRequest = http.request(options, function (externalResponse) {
                    externalResponse.on('data', function (chunk) {

                        var offers = JSON.parse(chunk);

                        callback(null, offers);
                    });
                });
                externalRequest.end();
            }],
			
			// Main function: renders result
            function (error, offers) { // 

                var error = 0;
                var success = 0;
                var id = 0;

                if (req.query.e != null) {
                    error = req.query.e;
                }

                if (req.query.s != null && req.query.id != null) {
                    success = req.query.s;
                    id = req.query.id;
                }else {
                    var offer = [];
                }

                res.render('../data/pages/loggedin', {
                    error: error,
                    success: success,
                    id: id,
                    offers: offers.success.offers,
                    offer: offer
                });
            }
        ); 
    }else {
        res.redirect('login');
    }
});

/* * * * * * * * *
 *  User Login  *
 * * * * * * * * */

app.get('/loggedin', function (req, res) {

    if (req.query.passwort != null) {

        var pw = req.query.passwort;

        if (pw == "mypass") {

            // Set Cookie
            var cookieOptions = {
				// one year
                maxAge: 60 * 60 * 24 * 30 * 12, 
                httpOnly: true
            };
            res.cookie('loggedin', 'true', cookieOptions);

            // Redirect to homescreen
            res.redirect('../data/pages/index');
        }else {
            res.render('../data/pages/login', {
                falschespw: true
            });
        }
    }else {
        res.render('../data/pages/login', {
            falschespw: false
        });
    }
});

/* * * * * * * * *
 *  User Logout  *
 * * * * * * * * */

app.get('/logout', function (req, res) {
    
	res.clearCookie('loggedin');
    res.redirect('../data/pages/loggedin');
});

/* * * * * * * * * * * * *
 *      Post offers      *
 * * * * * * * * * * * * */

app.post('/offers', function (req, res) {

    if (req.body.id 		!= null && req.body.id != "" 		&& 
		req.body.city 		!= null && req.body.city != "" 		&& 
		req.body.rent 		!= null && req.body.rent != "" 		&& 
		req.body.renttype 	!= null && req.body.renttype != "" 	&& 
		req.body.size		!= null && req.body.size != "" 		&& 
		req.body.roomqty 	!= null && req.body.roomqty != "") {

        // New offers entry
        var options = {
            host: 'localhost',
            port: 1337,
            path: '/offers',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var externalRequest = http.request(options, function (externalResponse) {

            externalResponse.on('data', function (chunk) {

                var offerdata = JSON.parse(chunk);

                if (offerdata != null) {

                    if (offerdata.success != false) {
                        res.redirect('user?s=1&id=' + offerdata.success.newoffer.id);
                    }else {
                        res.redirect('user?e=' + offerdata.error.message);
                    }
                }
            });
        });

        externalRequest.write(JSON.stringify({
            "id": req.body.id,
            "city": req.body.city,
			"rent": req.body.rent,
            "rentype": req.body.renttype,
			"size": req.body.size,
			"roomqty": req.body.roomqty
        }));
		
		client.publish('/messages', { text: 'An new offer was posted' } )
			.then(function(){
				console.log('Message received by server');
			}, function(error) {
			console.log('There was an error publishing:' + error.message);
		});

        externalRequest.end();
    }else {
        // Display error message
        res.redirect('user?e=4');
    }
})

/* * * * * * * * 
 * Offer per ID *
 * * * * * * * */

app.get('/offers/:id([0-9]+)', function (req, res) {

    async.waterfall([
		// Find specific offer
        function (callback) { 

            var id = req.params.id;
            var options = {
                host: 'localhost',
                port: '1337',
                path: '/offers/' + id,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            var externalRequest = http.request(options, function (externalResponse) {

                externalResponse.on('data', function (chunk) {

                    var offerdata = JSON.parse(chunk);

                    if (offerdata.success == false) {
                        var error = new Error("Offers Error:" + offerdata.error.message);
                    }else {
                        var error = null;
                    }
                    callback(error, offerdata);
                });
            });
            externalRequest.end();
        },
		// Get all offers
        function (offerdata, callback) { 

            var options = {
                host: 'localhost',
                port: '1337',
                path: '/offers',
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            }

            var externalRequest = http.request(options, function (externalResponse) {

                externalResponse.on('data', function (chunk) {

                    var offers = JSON.parse(chunk);

                    if (offers.success == false) {
                        var error = new Error("Offers Error:" + offers.error.message);
                    }else {
                        var error = null;
                    }

                    callback(error, offerdata, offers.success.offers);
                });
            });

            externalRequest.end();
        }
    ],
		// Main function: Renders results
        function (error, offer, city) { 

            if (error == null) {

                var offer = JSON.parse(offer.success.offer);

                res.render('../data/pages/offers', {

                    offer: offer,
                    city: city

                });
            }else {
                res.render('../data/pages/offers', {

                    offer: null,
                    city: null,
                    error: error
                });
            }
        }
    ); 
});

/* * * * * * * * * * * *
 * Delete offer by ID  *
 * * * * * * * * * * * */

app.delete('/offers/:id([0-9]+)', function (req, res) {

    var options = {
        host: 'localhost',
        port: 1337,
        path: '/offers/' + req.params.id,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var externalRequest = http.request(options, function (externalResponse) {
        externalResponse.on('data', function (chunk) {
            res.json({ "success": true });
        });
    });
	
	client.publish('/messages', { text: 'An offer was deleted' } )
		.then(function(){
			console.log('Message received by server');
		}, function(error) {
		console.log('There was an error publishing:' + error.message);
	});
	
    externalRequest.end();
})

/* * * * * * * * * * * *
 * Change Offers by ID *
 * * * * * * * * * * * */

app.put('/offers/:id([0-9]+)', function (req, res) {

    if (req.body.id 		!= null && req.body.id != "" 		&& 
		req.body.city 		!= null && req.body.city != "" 		&& 
		req.body.rent 		!= null && req.body.rent != "" 		&& 
		req.body.renttype 	!= null && req.body.renttype != "" 	&& 
		req.body.size		!= null && req.body.size != "" 		&& 
		req.body.roomqty 	!= null && req.body.roomqty != "") {
				
        var options = {
            host: 'localhost',
            port: 1337,
            path: '/offers/' + req.params.id,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        };
		
        var externalRequest = http.request(options, function (externalResponse) {

            externalResponse.on('data', function (chunk) {

                res.json({ success: true });
            });
        });

        externalRequest.write(JSON.stringify({
            "id": req.body.id,
            "city": req.body.city,
			"rent": req.body.rent,
            "rentype": req.body.renttype,
			"size": req.body.size,
			"roomqty": req.body.roomqty
        }));
		
		client.publish('/messages', { text: 'An offer was changed' } )
			.then(function(){
				console.log('Message received by server');
			}, function(error) {
			console.log('There was an error publishing:' + error.message);
		});
		
        externalRequest.end();
    }
    else {
        // Display error message!
        res.redirect('user?e=4');
    }
})

/* * * * * * * * *  * * * * *
 *     List all offers 		*
 *   Query Parameter: city  *
 * * * * * * * * * *  * * * */

app.get('/offers', function (req, res) {

    var search = encodeURIComponent(req.query.search);

	if(req.query.search != null){
		var options = {
			host: 'localhost',
			port: '1337',
			path: '/offers?search=' + search,
			method: 'GET',
			headers: {
				accept: 'application/json'
			}
		}
	}else{
		var options = {
			host: 'localhost',
			port: '1337',
			path: '/offers',
			method: 'GET',
			headers: {
				accept: 'application/json'
			}
		}
	}

    var externalRequest = http.request(options, function (externalResponse) {

        externalResponse.on('data', function (chunk) {

            var offerdata = JSON.parse(chunk);
			
            res.render('../data/pages/offers', {
                offers: offerdata.success.offers
            });
        });
    });

    externalRequest.end();
});

/* * * * * * * * * *
 *  ConsoleScreen  *
 * * * * * * * * * */
 
function welcomeScreen(){
    console.log('');
    console.log('++++++++++++++++++++++++++++++++++++++++++++++');
    console.log('+                   WGhilfe                  +');
    console.log('++++++++++++++++++++++++++++++++++++++++++++++');
	console.log('+                                            +');
	console.log('+          Socket.io is listening on         +');
	console.log('+            http://localhost:' + settings.httpport+'           +');
    console.log('+                                            +');
    console.log('+      Server is running on Port '+settings.port+'        +');
    console.log('+                                            +');
    console.log('+ Open http://localhost:'+settings.port+' in your Browser +');
	console.log('+                                            +');
	console.log('++++++++++++++++++++++++++++++++++++++++++++++');
};

/* * * * * * *
 *  Mainapp  *
 * * * * * * */

app.listen(settings.port, welcomeScreen());