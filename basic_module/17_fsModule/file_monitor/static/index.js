var socket = io.connect('http://127.0.0.1:3000');
socket.on('change_from_server', function (data) {
		$('textarea').attr('value', data.msg);
});
$(document).ready(function(){
	$('textarea').keyup(function(){
		socket.emit('data', { msg: $('textarea').attr('value') });
	});
});