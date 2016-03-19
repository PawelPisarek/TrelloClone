var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://PM-user:uidas7be21@51.254.221.201:27017/projectManager';

var insertDocument = function(db, callback) {
   db.collection('users').insertOne( {
		"id": 0,
		"auth": [{
			"login": "admin",
			"pass": "admin"
		}],
		"type": "Admin",
		"desc": "Administrator systemu"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};

var findAdmin = function(db, callback) {
   var cursor = db.collection('users').find( { "type": "Admin" } );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  
  //insertDocument(db, function() {
	//db.close();	  
  //});
  
  findAdmin(db, function() {
    db.close();
  });
});