// Modules
var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    validator = require('jsonschema').Validator;

const v = new validator();
var text = fs.readFile('testdata.json');
var newOffer = JSON.parse(text);

//Get all offers
router.get('/', function(req, res){
    res.status(200).json(data.offers);
});

/*Send new offer
router.post('/', function( req, res ) {
  var newOffer = req.body;
  var nextID = data.offers.reduce( (maxId, offer)=> {
    return Math.max( maxId, data.offers.id);
  }, 0 );
  nextID += 1;
  newOffer.id = nextID;
  data.offers.push(newOffer);
  res.set('Location', '/offers/' + nextID);
  res.sendStatus(201);
});
*/

//Send new offer
router.post('/:id/:city/:rent/:renttype/:size/:roomqty?', function(req, res){
  var file = req.params;
  var id = Number(file.id);
  var city = file.city;
  var rent = Number(file.rent);
  var renttype = file.renttype;
  var size = Number(file.size);
  var roomqty = Number(file.roomqty);
  var reply;

  if(!id||!city||!rent||!renttype||!size||!roomqty){
    reply = {
      msg: "Something is missing."
    }
  }
  else {
    newOffer[id] = city, rent, renttype, size, roomqty;
  /* Check body text
  if (!newOffer) {
    var message = {
      "success": false,
      "error": {
        "message": "Missing body text!"
      }
    }
    return res.status(400).json(message);
  }
  */
  // Validates new offer
//var value = v.validate(newOffer, offerScheme);
  //if(value.valid){
    var giveth = JSON.stringify(newOffer, null, 2);
    fs.writeFile('testdata.json', giveth, finished);
    function finished(err) {
      console.log('All set.');
    }
  }
});

    /* function(err, rep) {
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
    }); */

    /*data.offers.set('offer:' + newOffer.id, JSON.stringify(newOffer), function (err, rep) {
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
        //
        res.header('Location', '/offers/' + newOffer.id).status(201).json(message);
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
*/

//Delete offer
router.delete(function(req, res){
  data.offers.del('offer:' + req.params.id, function (err, rep) {
    if (err) {
      var message = {
        "success": false,
        "error": {
          "message": err
        }
      }
      return res.status(500).json(message);
    }
    //success
    if (rep == 1) {
      var message = {
        "success": {
          "message": "Offer with the ID " + req.params.id + " deleted!"
        },
        "error": false
      }
      res.status(200).json(message);
    }
    //not found
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

//Sort offers by ID
router.get('/:id', function(req, res){
  // ID from URL
  var id = parseInt(req.params.id);

  //Check if valid, else
  if (isNaN(id)) { res.status(400).json(data.errors.badParameters) }

  // Respond with filtered user data
  var offer = data.offers.filter(function(u){ return u.id == id});
  res.status(200).json(offer);
});

//Setting up module for usage
module.exports = router;

/*
//Sort offers by maximum size
router.get('/size/:size', function(req, res){
  // ID from URL
  var size = parseInt(req.params.size);

  //Check if valid, else
  if (isNaN(size)) { res.status(400).json(data.errors.badParameters) }

  // Respond with filtered user data
  var offer = data.offers.filter(function(u){ return u.size <= size});
  res.status(200).json(offer);
});
Sort offers by maximum room quantity
router.get('/rooms/:roomqty', function(req, res){
  // ID from URL
  var roomqty = parseInt(req.params.roomqty);
  //Check if valid, else
  if (isNaN(roomqty)) { res.status(400).json(data.errors.badParameters) }
  // Respond with filtered user data
  var offer = data.offers.filter(function(u){ return u.roomqty <= roomqty});
  res.status(200).json(offer);
});
*/
/*Sort offers by cityname
router.get('/:city', function(req, res){

  // ID from URL
  var city = parseInt(req.params.city); //parseInt does not work for strings

  //Check if valid ID, else
  if (city == data.offers.city) { res.status(400).json(data.errors.badParameters) }

  // Respond with filtered user data
  var offer = data.offers.filter(function(u){ return u.city == city });
  res.status(200).json(offer);
});
*/
