var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');

var url = 'mongodb://PM-user:uidas7be21@51.254.221.201:27017/projectManager';

module.exports = function(app){

    app.post('/test', function(req, res) {
      res.json({
          token: 'iash12e12edias87uhdiase1e12e'
        });
      //res.status(200).send("ok");
    });

    app.post('/login', function(data, res) {
        console.log(":POST login start.");
        var auth = data.body;
        console.log("Login: " + auth.login);
        console.log("Haslo: " + auth.pass);

        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            var cursor = db.collection('users').find({
                "login": auth.login
            });
            var success = false;
            console.log(":Przed kursorem.");
            cursor.each(function(err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    console.log(":Cos jest w bazie.");
                    if (doc.pass == auth.pass && doc.login == auth.login) {
                        console.log("Udane logowanie.");
                        //res.status(200).send("ok");
                        res.json({
                            token: 'iash12e12edias87uhdiase1e12e'
                        });
                        success = true;
                    }
                } else {
                    if (!success) {
                        console.log(":Nieudane logowanie.");
                        console.log('Failed login with: ' + auth.login + '/' + auth.pass);
                        res.json({ failed: true });
                    }
                }
            });
            console.log(":Poza kursorem.");
        });
        console.log(":POST login end.");
    });


    app.get('/api/user', (data, res)=> {
        res.status(200).send({
            id: "jakiesId",
            email: "admin@admin"
        })
    });

    app.post('/register', function(data, res) {

        var auth = data.body;
        console.log("Login: " + auth.login);
        console.log("Haslo: " + auth.pass);
        
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            
            var cursor = db.collection('users').find({
                "login": auth.login
            });
            var success = false;
            cursor.each(function(err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    if (doc.login == auth.login ) {
                        console.log("Uztkownik o takim  loginie juz istnieje");
                        console.log('Failed sign up with: ' + auth.login);
                    }
                    success = true;
                } else {
                    if (!success) {
                        console.log("Mozna stworzyc nowego uzytkownika");
                        db.collection('users').insert({ "login": auth.login, "pass": auth.pass });
                        console.log("DODANO UZYTKOWNIKA: login:" + auth.login + " pass:" +auth.pass);
                    }
                }      
                                   
            });

            //wyswietlanie wszystkich uzytkownikow z bazy
            /*db.collection('users').find().toArray(function(err, items) {
                console.log(items);
            })*/
           
        });
        console.log(":POST signup end.");
    });

}