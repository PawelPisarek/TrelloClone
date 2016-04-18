var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
​
app.get('/', function(req, res) {});
​
var url = 'mongodb://PM-user:uidas7be21@51.254.221.201:27017/projectManager';
​
​
app.post('/login', function(data, res){
	if (typeof(data) == 'undefined' || data == null || data.login == '' || data.pass == '') {
            return;
        }
​
        //Polaczenie z baza:
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            var cursor = db.collection('users').find({
                "auth.login": data.login
            });
			var success = false;
            cursor.each(function(err, doc) {
                assert.equal(err, null);
					if (doc != null) {
						//Jezeli login i haslo zgadzaja sie:
						if (doc.auth[0].pass == data.pass && doc.auth[0].login == data.login) {
							console.log("Success login user: ");

							res.json({
								token: 'iash12e12edias87uhdiase1e12e'
							});
							return;
						}
					} else {
						if(!success) {
							console.log('Failed login with: ' + data.login + '/' + data.pass);
							res.json({failed: true});
							return;
						}
					}
            });
        });
		res.json({failed: true});
});
​
​
http.listen(3653, function() {
    console.log('listening on *:3653');
});
