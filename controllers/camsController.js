var bodyParser = require('body-parser');
var data = [{kamera: "PiCam"}, {kamera: "Usb 30fps"}];
var urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.post('/cams', urlEncodedParser, function(req, res){
      console.log("Er i POST /cams m data --> " + data);

        data.push(req.body);
        res.json(data);
      });


    app.get('/cams', function(req, res){
       console.log("Er i GET /cams data --> " + data.kamera);
        res.render('cams', {kameras: data});
    });


    app.delete('/cams', function(req, res){


    });

};
