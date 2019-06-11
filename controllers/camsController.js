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



  // ---------------------------------------------------------------GET /cams
    app.get('/cams', function(req, res){    
      Kamera.find({}, function(err, data){
        if (err) throw err;
        console.log("cams fra db --> " + JSON.stringify(data));
        res.render('cams', {kameras: data});
      });
    });

   // ---------------------------------------------------------------GET /regCam
   app.get('/regCam', function(req, res){
    
    res.render('regCam', {error: false});
  });
 
  // ---------------------------------------------------------------POST /regCam
    app.post('/regCam', urlEncodedParser, function(req, res){
    console.log("POST /regCam req.body --> " + JSON.stringify(req.body)); 
       
    var newKamera = Kamera(req.body).save(function(err, data){
      if(err) throw err;
      //res.json(data);
      res.render('index', {error: false});
    });
  });

}; //module.exports


