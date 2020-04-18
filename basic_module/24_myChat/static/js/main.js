var socket = io.connect();
socket.on('online_list', function (data) {
    var Dom = '';
    for(var i=0; i<data.length; i++){
        Dom = Dom + "<li><a href='javascript:void(0)'>" + data[i] + "</a></li>";
        $(".friend_list").html(Dom);
    }
});

socket.on('pic_list', function (data) {
	var Dom = '';
	for(var i=0; i<data.length; i++){
		var userInfo = data[i];
		var Dom = Dom + "<li class='span4' id='" + userInfo.name + "'>"+"<span style='margin-left:80px'> <img width='50px' height='50px' src='/static/image/" + userInfo.pic + "'></img></span>"+"<a href='#'><span  style='margin-left:70px'>" + userInfo.name + "</span>" + "</a><span class='msg_detail'></span></li>";
		$(".tab_list").html(Dom);
	}
});

socket.on('say_msg', function (data) {
    var username = data['name'];
	var dom = "<div class='alert'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Tips:</strong>" + data['msg'] + "</div>";
	$('#'+username).find('.msg_detail').html(dom);;
});


socket.on('msg', function (data) {
    var Dom = " <li><span  class='icon-user'></span><span class='live_user_name text-success'>[danhuang]</span><span class='live_message text-info'>" + data.msg + "</span></li>";
    $($('.live_area').find('ul').find('li').eq(0)).before(Dom);
});

socket.on('live_data', function (data) {
    $('.live_area').find('ul').html(data);
});

$("#send_msg").click(function(){
    var msg = $('textarea').val();
    socket.emit('public',{'msg' : msg});
});

$("#send_msg").click(function(){
    var msg = $('textarea').val();
    socket.emit('public',{'msg' : msg});
});

$("#msg_post").click(function(){
	var msg = $('#msg_value').val();
	$.get('/login/say', {'msg':msg}, function(data){
	});
});

