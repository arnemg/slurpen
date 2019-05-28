var express = require('express');
var camsController = require('./controllers/camsController');

var app = express();


//set up EJS view-engine
app.set('view engine', 'ejs');


//Handling static file requests
app.use(express.static('./public'));


//Fire camsController
camsController(app);

//Lytt til en port
app.listen(3000);
console.log('Du lytter for tiden til port 3000');

