Deck = Backbone.Model.extend({
	defaults: {
		cards: []
	},
	initialize: function() {
		console.debug("Deck initialized with " + this.size() + " cards");
	},
	size: function() {
		return this.get('cards').length;
	}
}, {
	generate: function() {
		var cardNames = Card.getCardNames();
		var suitNames = Suit.getSuitNames();
		var cards = [];
		for (var i=0; i<cardNames.length; i++) {
			for (var j=0; j<suitNames.length; j++) {
				cards.push(
					new Card({name: cardNames[i], suit: suitNames[j]})
				);
			}
		}
		return new Deck({cards: cards});
	}
});
