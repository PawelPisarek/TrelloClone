var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

app.get('/', function(req, res) {});

var url = 'mongodb://PM-user:uidas7be21@51.254.221.201:27017/projectManager';
var numUsers = 0;
var userList = {'key': 'Server'};

//user connected to server:
io.on('connection', function(socket) {
    var addedUser = false;

    console.log('Some client connected: ' + socket.id);

    //try login:
    socket.on('login', function(data) {
        if (typeof(data) == 'undefined' || data == null || data.login == '' || data.pass == '') {
            socket.disconnect();
            return;
        }

        if (addedUser) return;

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
							socket.username = data.login;
							socket.userID = doc.id;
							numUsers++;
							addedUser = true;

							userList['key' + socket.userID] = socket.username;

							console.log("Success login user: " + socket.username);
							
							success = true;
							socket.emit('logged in', {
								username: socket.username,
								token: 'iash12e12edias87uhdiase1e12e'
							});
						}
					} else {
						db.close();
						if(!success) {
							console.log('Failed login with: ' + data.login + '/' + data.pass);
							socket.emit('login error', {
								message: 'Failed login, check login and password.'
							});
							socket.disconnect();
						}
					}
            });
        });


    });


    //User disconnected:
    socket.on('disconnect', function() {
        if (addedUser) {
            numUsers--;
            delete userList["key" + socket.userID];

            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });

            socket.broadcast.emit('usersList', userList);

            console.log(socket.username + ' has disconnected from the chat.' + socket.id);
        }
    });

});

http.listen(3653, function() {
    console.log('listening on *:3653');
});