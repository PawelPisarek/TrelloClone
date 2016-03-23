
	var _SERVER = 'localhost:3653';
	var socket = io.connect(_SERVER);
	var myNickname = 'Ja';
	

	socket.on('connect', function(msg){
		socket.emit('login', {
			login: prompt('Login:'),
			pass: prompt('Password:')
		});
		
		console.log('Client connected to server.');
	});

	socket.on("disconnect", function(){
		console.log("Client disconnected from server");
		addChatMessage('You are disconnected.', 'color: red;');
		$('#nick').html('...');
	});

	socket.on('connect_error', function() {
		console.log('Failed to connect to server');
		jQuery('#connect').attr("disabled", false);
		jQuery('#disconnect').attr("disabled", true);
	});

	socket.on('logged in', function (data) {
		myNickname = data.username;
		token = data.token;

		addChatMessage('You are Connected as ' + myNickname + '.', 'color: red;');
		addChatMessage('Your token: ' + token, 'color: red;');
		$('#nick').html(myNickname);
		$('#mesageInput').focus();
	});
	
	socket.on('login error', function (data) {
		message = data.message;
		addChatMessage('Fail: ' + message + '.', 'color: red;');
	});

	function send(){
		var msg = $('#mesageInput').val();
		if(msg.trim() == '')
			return false;
		//socket.emit('new message', msg);
		addChatMessage('~' + myNickname + ': ' + msg, 'font-weight: bold;');
		$('#mesageInput').val('');
		return true;
	}

	
	$(document).keypress(function (e) {
	  if (e.which == 13 && $('#mesageInput').val().trim() != '') {
		send();
		return false;
	  }
	});

	function addChatMessage (msg, style) {
		var $messages = $('#messages');
		
		if (style === undefined)
			$('#messages').append($('<li>').text(msg));
		else
			$('#messages').append($('<li style="'+style+'">').text(msg));
		
		$messages[0].scrollTop = $messages[0].scrollHeight;
	}