var TableauColumn = Backbone.Collection.extend({
	model: Card
}, {
	create: function(deck) {
		var column = new TableauColumn([
			deck.getCard(),
			deck.getCard(),
			deck.getCard(),
			deck.getCard(),
			deck.getCard()
		]);
		console.debug("Deck now has " + deck.size() + " cards");
		return column;
	}
});
