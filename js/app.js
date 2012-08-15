(function($) {
	var startView = new StartView({el: $('#container')});
	var startingCards = [
		new Card({name: '2', suit: new Suit({name: 'heart'})}),
		new Card({name: '3', suit: new Suit({name: 'spade'})}),
		new Card({name: '4', suit: new Suit({name: 'diamond'})}),
		new Card({name: '5', suit: new Suit({name: 'club'})}),
		new Card({name: '6', suit: new Suit({name: 'heart'})}),
		new Card({name: '7', suit: new Suit({name: 'spade'})}),
		new Card({name: '8', suit: new Suit({name: 'diamond'})}),
		new Card({name: '9', suit: new Suit({name: 'club'})}),
		new Card({name: '10', suit: new Suit({name: 'heart'})}),
		new Card({name: 'jack', suit: new Suit({name: 'spade'})}),
		new Card({name: 'queen', suit: new Suit({name: 'diamond'})}),
		new Card({name: 'king', suit: new Suit({name: 'club'})})
	];
	var startingFoundation = $('#foundation-5');
	var foundation = startingFoundation;
	$.each(startingCards, function(i, card) {
		var cardView = new CardView({el: foundation, card: card});
		foundation = foundation.next('.foundation');
	});
})(jQuery);