var TableauColumn = Backbone.Collection.extend({
	model: Card
}, {
	create: function(deck) {
		return new TableauColumn([
			deck.getCard(),
			deck.getCard(),
			deck.getCard(),
			deck.getCard(),
			deck.getCard()
		]);
	}
});
