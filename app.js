var express = require('express');
var camsController = require('./controllers/camsController');

var app = express();


//set up EJS view-engine
app.set('view engine', 'ejs');

//Handling static file requests
app.use(express.static('./public'));

//Fire camsController
camsController(app);


//listen for request (sette opp webserveren)
app.listen(process.env.port || 4000, function(){
    //process.env.port -- port ligger i environment. Hvis nødvendig
    console.log("Du lytter for tiden på port 4000");
  });
