var express = require('express');
var app = express(), basePath;
var http = require('http').Server(app);
var assert = require('assert');
var bodyParser = require('body-parser');


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


//Loading modules here:
require('./users')(app);
//require('./site')(app);
//require('./upload')(app);
//require('./admin')(app);


//Starting server listen here:
var server = app.listen(8081, function () {
	var port = server.address().port
	console.log("Example app listening at http://127.0.0.1:%s", port)
})
