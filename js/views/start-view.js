StartView = Backbone.View.extend({
	initialize: function() {
		this.render();
		//console.debug("StartView initialized");
	},
	render: function() {
		var template = _.template($('#start-view-template').html(), {});
		$(this.el).html(template);
	}
});
