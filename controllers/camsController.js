var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

var data = [{kameranavn: "PiCam"}, {kameranavn: "Usb 30fps"},
            {kameranavn: "Nikon FM"}];

// ---------------------------------------------------------------GET /
app.get('/', function(req, res){
  console.log('Er inne i GET / - index.ejs')
  res.render('index', {error: false});
});

// ---------------------------------------------------------------GET /slurpen
app.get('/slurpen', function(req, res){
  console.log("Er inne i GET /slurpen");
  //kameras overføres til EJS filen og benyttes til å liste opp og hente ut data
  res.render('slurpen', {kameras: data});
});

// ---------------------------------------------------------------GET /livevideo
app.get('/livevideo', function(req, res){
  console.log("Er inne i GET /livevideo");
  //kameras overføres til EJS filen og benyttes til å liste opp og hente ut data
  res.render('livevideo', {error: false});
});


// ---------------------------------------------------------------GET /cams
app.get('/cams', function(req, res){
  console.log("Er inne i GET /cams");
  //kameras overføres til EJS filen og benyttes til å liste opp og hente ut data
  res.render('cams', {kameras: data});
});

// ---------------------------------------------------------------DELETE /cams
app.delete('/cams/:kameranavn', function(req, res){

  data = data.filter(function(kamera){
    return kamera.kameranavn.replace(/ /g, '-') !== req.params.kameranavn;
  });
  res.json({kamera: data});
  console.log("inne i DELETE param " + req.params.kameranavn);

});

// ---------------------------------------------------------------POST /cams
app.post('/cams', urlEncodedParser, function(req, res){
    data.push(req.body);
    res.json({kamera: data});
    //console.log("Er i POST /cams req.body --> " + req.body);
  });



};