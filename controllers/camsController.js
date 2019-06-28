var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});

const mongoose = require('mongoose');
mongoose.connect('mongodb://arnemg:jalla900@mint_iot_hub:27017/slurpen');

mongoose.connection.once('open', function(){
  console.log("Knyttet til DB");
}).on('error', function(error){
    console.log('Noe har skjedd i DB connect --> ' + error)
});

//Et Schema for records
var kameraSchema = new mongoose.Schema({
    kameranavn: String,
    lokasjon: String,
    stream: String,
    aktiv: Boolean
});

//En Model som baseres på Schema
var Kamera = mongoose.model('Webcams', kameraSchema);


module.exports = function(app){

  // ---------------------------------------------------------------GET /
  app.get('/', function(req, res){
    
    res.render('index', {error: false});
  });
 // ---------------------------------------------------------------GET /livevideo
 app.get('/livevideo', function(req, res){
    
  res.render('livevideo', {error: false});
});


    // ---------------------------------------------------------------GET /cam - ETT kamera
    app.get('/cam/:kameranavn', function(req, res){
      var navn = req.params.kameranavn;            
      Kamera.findOne({kameranavn: navn}, function(err, data){
        if (err) throw err;
              
        res.render('cam', {kamera: data});
      });
      
    });

 
  // ---------------------------------------------------------------GET /cams - LISTE kameras
    app.get('/cams', function(req, res){    
      Kamera.find({}, function(err, data){
        if (err) 
          throw err;    
        res.render('cams', {kameras: data});
      });
    });

   // ---------------------------------------------------------------GET /regCam
   app.get('/regCam', function(req, res){
    
    res.render('regCam', {error: false});
  });
 
  // ---------------------------------------------------------------POST /regCam
    app.post('/regCam', urlEncodedParser, function(req, res){
      var newKamera = Kamera(req.body).save(function(err, data){
        if(err) throw err;
        res.render('index', {error: false});
      });
    });

}; //module.exports


