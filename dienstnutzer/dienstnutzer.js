// Get Change(Put) Delete	specific Offers + + +
// Get 				 		all 	 Offers +
// Post				 		specific Offers ?		

var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var http = require('http');
var cookieParser = require('cookie-parser');
var async = require("async");

//"socket.io": "^1.4.5",
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);

// Initializing Node Modules

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Settings

app.use(express.static(__dirname + '/offers'));
app.set('view engine', 'ejs');

const settings = {
	port: 1337,
};

// Ressources

var clientsSocket = [];
// io.set('origins','*'); // Bei Problemen mit CORS
io.on('connection', function(socket){
	// ClientSocket der Socket-Liste hinzufügen
	clientSockets.push(socket);
	console.log('Connection success!');
	
	socket.on('message', function(data){
		console.log('msg:', data);
		// Nachricht, die von einem Client kommt, an alle anderen Clients weitererichen
		clientSockets.forEach(function(clientSocket){
			clientSocket.send(data);
		});
	});
	
	// ClientSocket bei Verbindungsabbruch aus der Socket-Liste entfernen
	socket.on('disconnect', function(){
		console.log('Conection disconnected!');
		clientSockets.splice(ClientSockets.indexOf(Socket),1);
	});
});
httpServer.listen(port);
console.log("Listening on http://localhost:" + settings.port);

/* * * * * * * *
 *  Startseite *
 * * * * * * * */

app.get('/', function (req, res) {

    res.render('pages/index');

});

// Methodes

/* * * * * * * * * * * * *
 *      Post offers      *
 * * * * * * * * * * * * */

app.post('/offers', function (req, res) {

    if (req.body.name != null && req.body.name != "" && req.body.city != null && req.body.city != "") {

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

//TODO Überhaupt notwendig?
        var externalRequest = http.request(options, function (externalResponse) {

            externalResponse.on('data', function (chunk) {

                var offerdata = JSON.parse(chunk);

                if (offerdata != null) {

                    if (offerdata.success != false) {
                        res.redirect('adminbereich?s=1&id=' + offerdata.success.newoffer.id);
                    }
                    else {
                        res.redirect('adminbereich?e=' + offerdata.error.message);
                    }
                }

            });

        });

        externalRequest.write(JSON.stringify({
            "id": req.body.id,
            "city": req.body.city,
			"rent": req.body.rent,
            "rentype": req.body.renttype
			"size": req.body.size,
            "roomqty": req.body.roomqty
        }));

        externalRequest.end();

    }
    else {

        // Fehlermeldung ausgeben!

//TODO
        //res.redirect('adminbereich?e=4');

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

//TODO
            var externalRequest = http.request(options, function (externalResponse) {

                externalResponse.on('data', function (chunk) {

                    var offerdata = JSON.parse(chunk);

                    if (offerdata.success == false) {
                        var error = new Error("Offers Error:" + offerdata.error.message);
                    }
                    else {
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
                    }
                    else {
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

                res.render('pages/offers', {

                    offer: offer,
                    city: city

                });

            }
            else {

                res.render('pages/offers', {

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
    externalRequest.end();
})

/* * * * * * * * * * * *
 * Change Offers by ID *
 * * * * * * * * * * * */

app.put('/offers/:id([0-9]+)', function (req, res) {

    if (req.body.name != null && req.body.name != "" && req.body.city != null && req.body.city != "") {

        var options = {
            host: 'localhost',
            port: 1337,
            path: '/offers/' + req.params.id,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        };
//TODO
        var externalRequest = http.request(options, function (externalResponse) {

            externalResponse.on('data', function (chunk) {

                res.json({ success: true });

            });

        });

        externalRequest.write(JSON.stringify({
            "id": req.body.id,
            "city": req.body.city,
			"rent": req.body.rent,
            "rentype": req.body.renttype
			"size": req.body.size,
            "roomqty": req.body.roomqty
        }));
        externalRequest.end();
    }
    else {

        // Fehlermeldung ausgeben!
		
		//TODO
        //res.redirect('adminbereich?e=4');

    }
})

/* * * * * * * * *  * * * * *
 *     List all offers 		*
 *   Query Parameter: city  *
 * * * * * * * * * *  * * * */

app.get('/offers', function (req, res) {

    var suchen = encodeURIComponent(req.query.suchen);

	if(req.query.suchen != null){
		var options = {
			host: 'localhost',
			port: '1337',
			path: '/offers?suchen=' + suchen,
			method: 'GET',
			headers: {
				accept: 'application/json'
			}
		}
	}
	else{
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

//TODO
    var externalRequest = http.request(options, function (externalResponse) {

        externalResponse.on('data', function (chunk) {

            var offerdata = JSON.parse(chunk);
			
            res.render('pages/offers', {

                buechereien: offerdata.success.offers

            });

        });

    });

    externalRequest.end();


});

// Mainapp

app.listen(settings.port, function () {

    console.log('');
    console.log('+++++++++++++++++++++++++++++');
    console.log('+           WBsuche         +');
    console.log('+++++++++++++++++++++++++++++');
    console.log('');
    console.log('Server iss running on Port '+settings.port+'!');
    console.log('');
    console.log('Open http://localhost:'+settings.port+' in your Browser!');

});