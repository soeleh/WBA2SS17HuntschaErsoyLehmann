// Modules
var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    validator = require('jsonschema').Validator;

const v = new validator();
var data = fs.readFileSync('./data/testdata.json');
var offers = JSON.parse(data);

//Get all offers
router.get('/', function(req, res){
    res.status(200).json(offers.offers, null, 2);
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

//Send new offer
router.post('/:id/:city/:rent/:renttype/:size/:roomqty', function(req, res){
  var file = req.params;

  var id = Number(file.id);
  var city = file.city;
  var rent = Number(file.rent);
  var renttype = file.renttype;
  var size = Number(file.size);
  var roomqty = Number(file.roomqty);

  offers.offers[id] = ({id: id, city: city, rent: rent, renttype: renttype, size: size, roomqty: roomqty});
  var value = v.validate(offers.offers[id], offerScheme);
  if(value.valid){
    var newJson = JSON.stringify(offers, null, 2);
    fs.writeFile('./data/testdata.json', newJson, finished);

    function finished(err) {
      console.log('All set.');
      var reply ={
        id: id,
        city: city,
        rent: rent,
        renttype: renttype,
        size: size,
        roomqty: roomqty,
        success: true
      }
      res.send(reply);
    }
  }
  else{
    var reply = {
      success: false,
      message: "The JSON object is not valid!",
      details: value.errors
    }
      res.status(400).send(reply);
  }
});

router.put('/:id/:city/:rent/:renttype/:size/:roomqty', function(req, res){
  var file = req.params;

  var id = Number(file.id);
  var city = file.city;
  var rent = Number(file.rent);
  var renttype = file.renttype;
  var size = Number(file.size);
  var roomqty = Number(file.roomqty);

  offers.offers[id] = ({id: id, city: city, rent: rent, renttype: renttype, size: size, roomqty: roomqty});
  var value = v.validate(offers.offers[id], offerScheme);
  if(value.valid){
    var newJson = JSON.stringify(offers, null, 2);
    fs.writeFile('./data/testdata.json', newJson, finished);

    function finished(err) {
      console.log('Changed offer.');
      var reply ={
        id: id,
        city: city,
        rent: rent,
        renttype: renttype,
        size: size,
        roomqty: roomqty,
        success: true
      }
      res.send(reply);
    }
  }
  else{
    var reply = {
      success: false,
      message: "The JSON object is not valid!",
      details: value.errors
    }
      res.status(400).send(reply);
  }
});

//Delete offer
router.delete('/:id', function(req, res){
  var id = Number(req.params.id);
  if(offers.offers[id]!=null){
    offers.offers[id] = null;
    var newJson = JSON.stringify(offers, null, 2);
    fs.writeFile('./data/testdata.json', newJson, finished);

    function finished(err) {
      console.log('Removed data.');
      var reply ={
        id: id,
        success: true
      }
      res.send(reply);
    }
  }
  else{
    var reply = {
      success: false,
      message: "Requested ID not found",
      details: value.errors
    }
      res.status(400).send(reply);
  }
});


//Setting up module for usage
module.exports = router;
