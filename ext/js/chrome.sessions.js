id = '4df6489ab3e16';
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
			var that = $(this),
			    data = that.parent().data('data'),
				id = data.id,
				op = that.html();

			if (op === 'drop' && that.hasClass('confirm') === false) {
				that.toggleClass('confirm');
				that.html('drop?');
				setTimeout(function() {
					that.toggleClass('confirm');
					that.html('drop');
				}, 2000);
				return false;
			}

			if (op === 'drop?') {
				$.ajax(url + 'session/' + id, {
					type: 'delete',
					dataType: 'json',
					success: function(resp) {
						if (resp.error) return;
						that.parent()
							.html('Session dropped!')
							.delay(2000)
							.slideUp(200, function(){ $(this).detach(); });
					}
				});
			} 

			else if (op === 'open') {
				for (i in data.tabs) {
					chrome.tabs.create({
						pinned: (data.tabs[i].pinned === "true"),
						url: data.tabs[i].url
					});
				}
			}
			
			return false; // prevents bubbling
		});
	
	$.get(url + 'sessions', function(resp) {
		for (i in resp) {
			console.log(resp[i]);
			$('#sessionTemplate')
				.tmpl(resp[i])
				.data('data', resp[i])
				.appendTo('#sessions');
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
