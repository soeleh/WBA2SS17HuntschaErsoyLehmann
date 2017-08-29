var bodyParser = require('body-parser'),
    fs = require('fs');

var json;

fs.readFile('tesdata.json', function(err, data) {
  if (err) {
      var error = 'Could not read JSON data, try again!';
      return error;
    }
    var json = JSON.parse(data);
});

exports.offers = json;
