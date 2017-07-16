module.exports = {
    init: function (app) {

        app.route('/offers')

			// Show all offers

            .get(function (req, res) {

                db.keys('offer:*', function (err, rep) {

                    if (err) {
                        var message = {
                            "success": false,
                            "error": {
                                "message": err
                            }
                        }
                        return res.status(500).json(message);
                    }

                    var newOffers = [];

                    if (rep.length == 0) {
                        res.json(offers);
                        return;
                    }

                    db.mget(rep, function (err, rep) {

                        if (err) {
                            var message = {
                                "success": false,
                                "error": {
                                    "message": err
                                }
                            }
                            return res.status(500).json(message);
                        }

                        var message = {
                            "success": {
                                "message": "Request success!",
                                "offers": rep
                            },
                            "error": false
                        }
                        res.status(200).json(message);

                    });

                });

            })
            // Send new offer
            .post(function (req, res) {

                // Check body text
                if (!req.body) {
                    var message = {
                        "success": false,
                        "error": {
                            "message": "Missing body text!"
                        }
                    }
                    return res.status(400).json(message);
                }

                var newOffer = req.body;

                // Validates new offer
                var value = v.validate(newOffer, offerScheme);

                // If true, post new offer
                if (value.valid) {
                    db.incr('id:offers', function (err, rep) {

                        if (err) {
                            var message = {
                                "success": false,
                                "error": {
                                    "message": err
                                }
                            }
                            return res.status(500).json(message);
                        }

                        newOffer.id = rep;

                        db.set('offer:' + newOffer.id, JSON.stringify(newOffer), function (err, rep) {

                            if (err) {
                                var message = {
                                    "success": false,
                                    "error": {
                                        "message": err
                                    }
                                }
                                return res.status(500).json(message);
                            }

                            var message = {
                                "success": {
                                    "message": "Successfully posted new offer!",
                                    "newOffer": newOffer
                                },
                                "error": false
                            }
                            res.header('Location', '/offers/' + newOffer.id).status(201).json(message);

                        });

                    });
                }
                else {
                    var message = {
                        "success": false,
                        "error": {
                            "message": "The JSON object is not valid!",
                            "details": value.errors
                        }
                    }

                    res.status(400).json(message);
                }
            }

        );

        // Get, change or delete specific offers

        app.route('/offers/:id([0-9]+)')

            //Filter by ID
            .get(function (req, res) {

                db.get('offer:' + req.params.id, function (err, rep) {

                    if (err) {
                        var message = {
                            "success": false,
                            "error": {
                                "message": err
                            }
                        }
                        return res.status(500).json(message);
                    }

                    if (rep) {
                        var message = {
                            "success": {
                                "message": "Offer found!",
                                "offer": rep
                            },
                            "error": false
                        }
                        res.status(200).json(message);
                    }
                    else {
                        var message = {
                            "success": false,
                            "error": {
                                "message": "Offer with the ID" + req.params.id + " not found!"
                            }
                        }
                        res.status(404).json(message);
                    }

                });

            })

            //Change specific offer

            .put(function (req, res) {

                if (!req.body) {
                    var message = {
                        "success": false,
                        "error": {
                            "message": "Missing body text!"
                        }
                    }
                    return res.status(400).json(message);
                }

                // Validates offer

                var value = v.validate(req.body, offerScheme);

                if (value.valid) {

                    // If true, change offer

                    db.exists('offer:' + req.params.id, function (err, rep) {

                        if (err) {
                            var message = {
                                "success": false,
                                "error": {
                                    "message": err
                                }
                            }
                            return res.status(500).json(message);
                        }

                        if (rep == 1) {
                            var updatedOffer = req.body;
                            updatedOffer.id = req.params.id;
                            db.set('offer:' + req.params.id, JSON.stringify(updatedOffer), function (err, rep) {

                                if (err) {
                                    var message = {
                                        "success": false,
                                        "error": {
                                            "message": err
                                        }
                                    }
                                    return res.status(500).json(message);
                                }

                                var message = {
                                    "success": {
                                        "message": "Successfully updated!",
                                        "updatedOffer": updatedOffer
                                    },
                                    "error": false
                                }
                                res.status(200).json(message);
                            });
                        }
                        else {
                            var message = {
                                "success": false,
                                "error": {
                                    "message": "Offer with the id " + req.params.id + " not found!"
                                }
                            }
                            res.status(404).json(message);
                        }
                    });

                }
                else {
                    var message = {
                        "success": false,
                        "error": {
                            "message": "The JSON object is not valid!",
                            "details": value.errors
                        }
                    }

                    res.status(400).json(message);
                }

            })

            //Delete specific offer

            .delete(function (req, res) {

                db.del('offer:' + req.params.id, function (err, rep) {

                    if (err) {
                        var message = {
                            "success": false,
                            "error": {
                                "message": err
                            }
                        }
                        return res.status(500).json(message);
                    }

                    if (rep == 1) {
                        var message = {
                            "success": {
                                "message": "Offer with the ID " + req.params.id + " deleted!"
                            },
                            "error": false
                        }
                        res.status(200).json(message);
                    }
                    else {
                        var message = {
                            "success": false,
                            "error": {
                                "message": "Offer with the ID " + req.params.id + " not found!"
                            }
                        }
                        res.status(404).json(message);
                    }
                });

            });
    }
}
