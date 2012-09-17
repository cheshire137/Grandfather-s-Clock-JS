StartView = Backbone.View.extend({
	initialize: function() {
		this.render();
		//console.debug("StartView initialized");
	},
	render: function() {
		var template = _.template($('#start-view-template').html(), {});
		var startViewContainer = $(this.el);
		startViewContainer.html(template);
		$('.clock-face, .tableau', startViewContainer).css('height', $(window).height() + 'px');
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
		var startingFoundation = $('#foundation-5', startViewContainer);
		var foundation = startingFoundation;
		$.each(startingCards, function(i, card) {
			var cardView = new CardView({el: foundation, card: card});
			foundation = foundation.next('.foundation');
		});
		this.distributeFace();
		var tableauDeck = Deck.generate(startingCards);
		tableauDeck.shuffle();
		$('.tableau .column', startViewContainer).each(function() {
			var columnDiv = $(this);
			var tableauColumn = TableauColumn.create(tableauDeck);
			var tableauView = new TableauColumnView({el: columnDiv, cards: tableauColumn});
		});
		this.setCardSize();
	},
	setCardSize: function() {
		var cardRatio = 1.96 / 1.4;
		var cardContainer = $('.tableau .column .foundation .card-container').first();
		var cardWidth = cardContainer.width();
		var cardHeight = cardWidth * cardRatio;
		//console.log("Card ratio: " + cardRatio + ", width: " + cardWidth + ", height: " + cardHeight);
		$('.tableau .column .foundation .card-container').css('height', cardHeight + 'px');
	},
	distributeFace: function() {
		var viewportWidth = $(window).width();
		var viewportHeight = $(window).height();
		var clockFace = $('.clock-face');
		var width = clockFace.width();
		var height = clockFace.height();
		var minResolution = Math.min(width, height);
		var radius = Math.floor(minResolution / 2);
		var angle = 0;
		var step = (2 * Math.PI) / 12;
		var yOffsets = [];
		$('.clock-face .foundation').each(function() {
			var foundation = $(this);
			var x = Math.round(width / 2 + radius * Math.cos(angle) - foundation.width() / 2);
			var y = Math.round(height / 2 + radius * Math.sin(angle) - foundation.height() / 2);
			yOffsets.push(y);
			foundation.css({left: x + 'px', top: y + 'px'});
			angle += step;
		});
	}
});
