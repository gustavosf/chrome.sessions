id = '4df670648edcc';
url = 'http://dev/chrome.sessions/' + id + '/';

$(window).ready(function() {
	
	$('div#sessions > div')
		.live('click', function() {
			var detail = $(this).children('.details');
			if (detail.is(':visible')) detail.slideUp(100);
			else detail.slideDown(100);
			$(this).toggleClass('selected');
		})
		.live('hover', function() {
			$(this).children('span').hide();
			$(this).children('.button').show();
		})
		.live('mouseleave', function() {
			$(this).children('span').show();
			$(this).children('.button').hide();
		});
	
	$('div#sessions > div div.star')
		.live('click', function() {
			$(this).toggleClass('full');
			return false; // prevents bubbling
		});
	
	$('div#sessions > div > div.button')
		.live('click', function() {
			var id = $(this).parent().attr('rel'),
				op = $(this).html();

			console.log(op, id);
			
			return false; // prevents bubbling
		});
	
	$.get(url + 'sessions', function(resp) {
		console.log(resp);
		for (i in resp) {
			console.log(resp[i]);
			$('#sessionTemplate').tmpl(resp[i]).appendTo('#sessions');
		}
	}, 'json');
	
});

var enviar = function() {
	chrome.tabs.getAllInWindow(null, function(tabs){
		var desc = 'testando!';

		$.post(
			'http://dev/chrome.sessions/'+id+'/session',
			{ 'session': { 'desc':desc, 'tabs':tabs } },
			function(resp) {
				console.log(resp);
			}
		);
			
		
	});
}