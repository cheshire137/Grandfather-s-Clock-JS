(function($) {
	var startView = new StartView({el: $('#container')});
	$('#options-pull-tab').toggle(function(event) {
		event.preventDefault();
		$('#options').css('margin-top', 0);
	}, function(event) {
		event.preventDefault();
		var options = $('#options');
		options.css('margin-top', '-' + options.height() + 'px');
	});
	$('#background-options a').click(function(event) {
		var href = $(this).attr('href');
		var className = href.replace(/^#/, '');
		$('body').removeClass('felt').removeClass('wood').addClass(className);
	});
})(jQuery);