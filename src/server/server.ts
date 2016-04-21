var express = require('express');
var app = express(), basePath;
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');

var url = 'mongodb://PM-user:uidas7be21@51.254.221.201:27017/projectManager';


if (process.argv.indexOf('--src') === -1) {
   basePath = __dirname + '/../frontend/';
} else {
   console.log('Using source files!');
   basePath = __dirname + '/../../src/frontend/';
   app.use('/node_modules', express.static(__dirname + '/../../node_modules/'));
}

app.use(express.static(basePath));
app.use("/node_modules", express.static(__dirname + '/../../node_modules/'));

app.use(bodyParser.json());

app.post('/test', function(req, res) {
  console.log("Yoooooo");
  console.log(req.headers);
  console.log(req.body);
  console.log(req.body.login);
  res.status(200).send("yay");
});

app.post('/login', function(data, res){
    //console.log(data.body);
        var auth = data.body;
        
        //Polaczenie z baza:
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            var cursor = db.collection('users').find({
                "auth.login": auth.login
            });
			var success = false;
            cursor.each(function(err, doc) {
                assert.equal(err, null);
					if (doc != null) {
						//Jezeli login i haslo zgadzaja sie:
						if (doc.auth[0].pass == auth.pass && doc.auth[0].login == auth.login) {
							console.log("Success login user: ");

							res.json({
								token: 'iash12e12edias87uhdiase1e12e'
							});
							return;
						}
					} else {
						if(!success) {
							console.log('Failed login with: ' + auth.login + '/' + auth.pass);
							res.json({failed: true});
							return;
						}
					}
            });
        });
		res.json({failed: true});
});


var server = app.listen(8081, function () {
	var port = server.address().port
	console.log("Example app listening at http://127.0.0.1:%s", port)
})
