SuitView = Backbone.View.extend({
	initialize: function() {
		this.render();
		//console.debug("SuitView initialized");
	},
	render: function() {
		var card = this.options.card;
		var templateSel = '#suit-template-' + card.get('name');
		var template = _.template($(templateSel).html(), {});
		$(this.el).html(template);
	}
});
