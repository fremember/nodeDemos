$(document).ready(function(){
	$.get('/image', function(data){
		$('img').src = data.imgUrl;
	}, 'json');
});