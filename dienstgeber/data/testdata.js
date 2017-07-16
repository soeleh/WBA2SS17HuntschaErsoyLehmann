module.exports = {
	init: function (app) {
		
		//Initalize testdata
		app.route('/testdata').get(function (req,res) {

			db.incr('id:offers', function (err, rep) {
                var newId = rep;
                db.set('offer:'+newId, JSON.stringify(
                    {
                        "id": newId,
						"city": "Köln",
						"rent": 300,
						"renttype": "kalt",
						"size": 11,
						"roomqty": 1
                    }
                ));
            });
            db.incr('id:offers', function (err, rep) {
                var newId = rep;
                db.set('offers:'+newId, JSON.stringify(
                    {
                        "id": newId,
						"city": "Köln",
						"rent": 700,
						"renttype": "warm",
						"size": 53,
						"roomqty": 3
                    }
                ));
            });
            db.incr('id:offers', function (err, rep) {
                var newId = rep;
                db.set('offers:'+newId, JSON.stringify(
                    {
                        "id": newId,
						"city": "Köln",
						"rent": 1050,
						"renttype": "warm",
						"size": 72,
						"roomqty": 5
                    }
                ));
            });
            db.incr('id:offers', function (err, rep) {
                var newId = rep;
                db.set('offer:'+newId, JSON.stringify(
                    {
                        "id": newId,
						"city": "Gummersbach",
						"rent": 240,
						"renttype": "warm",
						"size": 11,
						"roomqty": 1
                    }
                ));
            });
            db.incr('id:offers', function (err, rep) {
                var newId = rep;
                db.set('offer:'+newId, JSON.stringify(
                    {
                        "id": newId,
						"city": "Gummersbach",
						"rent": 420,
						"renttype": "warm",
						"size": 49,
						"roomqty": 2
                    }
                ));
            });
            db.incr('id:offers', function (err, rep) {
                var newId = rep;
                db.set('offer:'+newId, JSON.stringify(
                    {
                        "id": newId,
						"city": "Grevenbroich",
						"rent": 450,
						"renttype": "warm",
						"size": 72,
						"roomqty": 3
                    }
                ));              
            });  
            db.incr('id:offers', function (err, rep) {
                var newId = rep;
                db.set('offer:'+newId, JSON.stringify(
                    {
                        "id": newId,
						"city": "Grevenbroich",
						"rent": 300,
						"renttype": "warm",
						"size": 59,
						"roomqty": 3
                    }
                ));
            });

            var message = {
                "success": {
                    "message": "Added all ze ads!"
                }
            }

            res.status(200).json(message);
        });
	}
}