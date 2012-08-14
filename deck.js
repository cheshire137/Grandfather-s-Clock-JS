Deck = Backbone.Model.extend({
	defaults: {
		cards: []
	},
	initialize: function() {
		console.debug("Deck initialized");
	},
	size: function() {
		return this.get('cards').length;
	}
});
