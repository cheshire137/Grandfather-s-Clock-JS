Deck = Backbone.Model.extend({
	defaults: {
		cards: []
	},
	initialize: function() {
		console.debug("Deck initialized with " + this.size() + " cards");
	},
	size: function() {
		return this.get('cards').length;
	},
	shuffle: function() {
		/* Modern Fisher-Yates:
		To shuffle an array a of n elements (indices 0..n-1):
		  for i from n − 1 downto 1 do
		       j = random integer with 0 ≤ j ≤ i
		       exchange a[j] and a[i] */
		var cards = this.get('cards');
		for (var i=this.size() - 1; i >= 1; i--) {
			var j = Math.floor(Math.random() * (i+1));
			var temp = cards[i];
			cards[i] = cards[j];
			cards[j] = temp;
		}
		this.set({cards: cards});
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
