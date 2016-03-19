var express = require('express');

module.exports = (function() {
    'use strict';
    var user = express.Router();
	
	user.get('/getUser', function (req, res) {
	  console.log('Sub-app: user/getUser');
	  res.send('Returning user: TEST');
	});

    return user;
})();