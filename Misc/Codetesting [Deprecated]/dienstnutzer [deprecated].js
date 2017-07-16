var express = require('express'),
    http = require('http'),
    request =require('request');

var app = express();


app.get('/offers/:id', function (req, res) {

   var ID=req.params.ID;
    var url=dhost+':'+dPort+ID;
    
    
    //get methode
    
    request.get(url,function(err,response,body){
        
        body=JSON.parse(body);
        res.json(body);
        
        
    })

    
});



app.get('/offers/:city', function (req, res){
    
    var city=req.params.city;
    var url=dhost+':'+dPort+city;
    
    
    request.get(url,function(err,response,body){
        
        body=JSON.parse(body);
        res.json(body);
        
        
    })
});
        
app.get('/offers/:city/:renttype', function (req, res){
    
    
    var renttype=req.params.renttype;
    var url=dhost+':'+dPort+renttype;
    
    
    request.get(url,function(err,response,body){
        
        body=JSON.parse(body);
        res.json(body);
        })
    
    
});

app.get('/offers/:city/rooms/:roomqty', function (req, res){
    
    var roomqty=req.params.roomqty;
    var url=dhost+':'+dPort+roomqty;
    
    
    request.get(url,function(err,response,body){
        
        body=JSON.parse(body);
        res.json(body);
        })
});


app.get('/offers/:city/size/:size', function (req, res){
    
     var size=req.params.size;
    var url=dhost+':'+dPort+size;
    
    
    request.get(url,function(err,response,body){
        
        body=JSON.parse(body);
        res.json(body);
        })
    
    
    
});



app.get('/offers/:city/:renttype/:rent', function (req, res){
    
      var rent=req.params.rent;
    var url=dhost+':'+dPort+rent;
    
    
    request.get(url,function(err,response,body){
        
        body=JSON.parse(body);
        res.json(body);
        })
    
});

app.post('/offers', function (req, res){
    
    var userData= {
    "id": 			1, 
	"city": 		"Gummersbach", 	
	"rent": 		450, 
	"renttype": 	"warm", 
	"size": 		9,  
	"roomqty": 		1
    };
    
    var url= dURL;
    
    var options={
        uri:url,
        method:'POST',
        headers:{
        'Content-Type':'mainApp/json'
    },
    json: userData    
    }
request(options,function(err,response,body){
        res.json(body);
        
});
    
    
});       



app.delete('/offers/:id', function (req, res){
    
    var id= req.params.id;
    var url=dURL + id;
    
    
    //delete methode
    request.delete(url,function(err,response,body){
                res.json(body);   
                   }
);

app.listen(3000,function()
          {
    console.log("Dienstnutzer ist nun auf dem Port 3000 verfügbar.");
});
});

