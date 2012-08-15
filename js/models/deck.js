Deck = Backbone.Model.extend({
	defaults: {
		cards: []
	},
	initialize: function() {
		console.debug("Deck initialized with " + this.size() + " cards");
	},
	getCard: function() {
		var card = this.get('cards').shift();
		console.debug("\tGot " + card.get('name') + " of " + card.get('suit').get('name') + "s");
		return card;
	},
	size: function() {
		return this.get('cards').length;
	},
	shuffle: function() {
		console.debug("Shuffling deck");
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
	generate: function(cardsToSkip) {
		cardsToSkip = typeof cardsToSkip !== 'undefined' ? cardsToSkip : [];
		var cardNames = Card.getCardNames();
		var suitNames = Suit.getSuitNames();
		var cards = [];
		for (var i=0; i<cardNames.length; i++) {
			var cardName = cardNames[i];
			for (var j=0; j<suitNames.length; j++) {
				var suitName = suitNames[j];
				var card = new Card({name: cardName, suit: new Suit({name: suitName})});
				var result = -1;
				$.each(cardsToSkip, function(idx, cardToSkip) {
					if (card.equals(cardToSkip)) {
						result = idx;
						return false;
					}
				});
				if (-1 == result) {
					cards.push(card);
				}
			}
		}
		return new Deck({cards: cards});
	}
});
