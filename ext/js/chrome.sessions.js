id = '4df670648edcc';
url = 'http://dev/chrome.sessions/' + id + '/';

$(window).ready(function() {
	
	$('div#sessions > div').live({
		click: function() {
			var detail = $(this).children('.details');
			if (detail.is(':visible')) detail.slideUp(100);
			else detail.slideDown(100);
			$(this).toggleClass('selected');
			$(this).find('div.info').toggleClass('over');
		},
		mouseenter: function() {
			var info = $(this).find('div.info');
			if ($(this).hasClass('selected') === false) {
				info.toggleClass('over');
			}
			info.children('span').hide();
			info.children('.button').show();
		},
		mouseleave: function() {
			var info = $(this).find('div.info');
			if ($(this).hasClass('selected') === false) {
				info.toggleClass('over');
			}
			info.children('span').show();
			info.children('.button').hide();
		}
	});
	
	$('div#sessions > div > header > div.star')
		.live('click', function() {
			$(this).toggleClass('full');
			return false; // prevents bubbling
		});
	
	$('div#sessions > div > header > div.info > div.button')
		.live('click', function() {
			xxx = this;
			var that = $(this),
				parent = that.parents('div#sessions > div'),
			    data = parent.data('data'),
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
						parent.children("header").html('Session dropped!');
						parent.delay(2000)
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
	
	$('div#new > div.button').click(function() {
		var input = $(this).siblings('input'),
			name = input.prop('value');
		input.prop('disabled', true);
		chrome.tabs.getAllInWindow(null, function(tabs){
			var session = { 'name': name, 'tabs': tabs }
			$.ajax(url + 'session', {
				type: 'put',
				data: session,
				dataType: 'json',
				success: function(resp) {
					$('#sessionTemplate')
						.tmpl(resp)
						.css('display', 'none')
						.data('data', resp)
						.appendTo('#sessions')
						.slideDown(200);
					input.prop('value', '');
					input.prop('disabled', false);
				}
			});
		});
	});
	
	$.get(url + 'sessions', function(resp) {
		for (i in resp) {
			$('#sessionTemplate')
				.tmpl(resp[i])
				.data('data', resp[i])
				.appendTo('#sessions');
		}
	}, 'json');
	
});