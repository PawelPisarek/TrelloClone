var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    DatabaseConnector = require('./services/SqliteConnector'),
    app = express(),
    basePath;


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
app.use(function (req, res, next) {
    if (req.path.indexOf('/api') !== 0 && path.extname(req.path).length === 0) {
        //req.url = 'app/index.html';
        return res.sendFile(path.join(basePath, 'index.html'));
    }
    next();
});

app.set('jwtSecret', 'secretJwtSeedWhichShouldntBeAsReproducibleAsThisString');
app.set('DatabaseConnector', new DatabaseConnector('./trelloClone.db'));

//Loading modules here:
app.use('/api', require('./modules/auth'));
app.use('/api', require('./modules/user'));
app.use('/api', require('./modules/dashboard'));
app.use('/api', require('./modules/task'));

//Starting server listen here:
var server = app.listen(8081, function () {
	var port = server.address().port
	console.log("Example app listening at http://127.0.0.1:%s", port)
})
