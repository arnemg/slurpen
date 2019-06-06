var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

var data = [{kameranavn: "PiCam", lokasjon: "Sofienbergparken Øst", aktiv: "false"}, 
            {kameranavn: "Usb 30fps", lokasjon: "Slurpen 2. etg mot lekeplass", aktiv: "true"}, 
            {kameranavn: "Nikon FM", lokasjon: "Botanisk Hage NordVestlig", aktiv: "false"} ];

// ---------------------------------------------------------------GET /
app.get('/', function(req, res){
  console.log('Er inne i GET / - index.ejs')
  res.render('index', {error: false});
});


// ---------------------------------------------------------------GET /regCam
app.get('/regCam', function(req, res){
  console.log("Er inne i GET /regCam");
  //kameras overføres til EJS filen og benyttes til å liste opp og hente ut data
  res.render('regCam', {kameras: data});
});


// ---------------------------------------------------------------POST /regCam
app.post('/regCam', urlEncodedParser, function(req, res){
  data.push(req.body);
  //res.json({kamera: data});
  res.render('cams', {kameras: data});
  console.log("Er i POST /cams req.body --> " + JSON.stringify(req.body));
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
  console.log("inne i DELETE param " + req.params.kameranavn);
  data = data.filter(function(kamera){
    return kamera.kameranavn.replace(/ /g, '-') !== req.params.kameranavn;
  });
  res.render('cams', {kameras: data});
  

});




};
