var express = require('express');
var app = express(),
    basePath;

if (process.argv.indexOf('--src') === -1) {
    basePath = __dirname + '/../frontend/';
} else {
    console.log('Using source files!');
    basePath = __dirname + '/../../src/frontend/';
    app.use('/node_modules', express.static(__dirname + '/../../node_modules/'));
}

app.use(express.static(basePath));

var server = app.listen(8081, function () {
  var port = server.address().port
  console.log("Example app listening at http://127.0.0.1:%s", port)
})
