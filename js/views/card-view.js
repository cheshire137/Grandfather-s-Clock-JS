CardView = Backbone.View.extend({
	initialize: function() {
		this.render();
		//console.debug("CardView initialized");
	},
	render: function() {
		var card = this.options.card;
		var variables = {card_name: card.get('name'), suit_name: card.get('suit').get('name')};
		var template = _.template($('#card-view-template').html(), variables);
		$(this.el).html(template);
		var suitContainer = $('.card .suit-container', $(this.el));
		var suitView = new SuitView({el: suitContainer, card: card});
	}
});
