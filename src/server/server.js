var express = require('express');
var app = express();

//modules:
var admin = require('./modules/admin');
var user = require('./modules/user');

app.get('/', function(req, res) {
		console.log('Main-app: /');
        res.send('Base Server');
    });

app.use('/admin', admin);
app.use('/user', user);

var server = app.listen(8081, function () {
  var port = server.address().port
  console.log("Example app listening at http://127.0.0.1:%s", port)
})