var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/slurpen');

mongoose.connection.once('open', function(){
  console.log("Knyttet til DB");
}).on('error', function(error){
    console.log('Noe har skjedd i DB connect --> ' + error)
});

//Et Schema for records
var kameraSchema = new mongoose.Schema({
    kameranavn: String,
    lokasjon: String,
    aktiv: Boolean
});

//En Model som baseres på Schema
var Kamera = mongoose.model('Webcams', kameraSchema);


module.exports = function(app){
  // ---------------------------------------------------------------GET /
  app.get('/', function(req, res){
    
    res.render('index', {error: false});
  });

  app.get('/cams', function(req, res){    
    Kamera.find({}, function(err, data){
      if (err) throw err;
      console.log("cams fra db --> " + data);
      res.render('cams', {kameras: data});
    });
  });

}; //module.exports


