var express = require('express');

module.exports = (function() {
    'use strict';
    var admin = express.Router();
	
	admin.get('/', function (req, res) {
	  console.log('Sub-app: Admin');
	  res.send('Admin Homepage');
	});

    return admin;
})();