TableauColumnView = Backbone.View.extend({
	initialize: function() {
		this.render();
		//console.debug("TableauColumnView initialized");
	},
	render: function() {
		var template = _.template($('#tableau-column-template').html(), {});
		$(this.el).html(template);
		var cardContainer = $('.card-container-1', $(this.el));
		this.options.cards.each(function(card) {
			var cardView = new CardView({el: cardContainer, card: card});
			cardContainer = cardContainer.next('.card-container');
		});
	}
});
