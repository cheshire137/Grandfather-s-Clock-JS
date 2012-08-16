CardView = Backbone.View.extend({
	initialize: function() {
		this.render();
		//console.debug("CardView initialized");
	},
	render: function() {
		var card = this.options.card;
		var cardName = card.get('name');
		var suitName = card.get('suit').get('name');
		if (suitName == 'diamond' || suitName == 'club') {
			if ($.inArray(cardName, ['king', 'jack', 'queen']) != -1) {
				var svgCardView = new SVGCardView({el: this.el, card: card});
				return;
			}
		}
		var variables = {card_name: cardName, suit_name: suitName};
		var template = _.template($('#card-view-template').html(), variables);
		$(this.el).html(template);
		var suitContainer = $('.card .suit-container', $(this.el));
		var suitView = new SuitView({el: suitContainer, card: card});
	},
	events: {
		"click .card": "onCardClick"
	},
	onCardClick: function(event) {
		var cardEl = $(event.currentTarget);
		var inTableau = cardEl.closest('.tableau').length > 0;
		if (inTableau) {
			this.onTableauCardClick(cardEl);
		} else {
			this.onClockCardClick(cardEl);
		}
	},
	onTableauCardClick: function(cardEl) {
		var cardContainer = cardEl.parent();
		if (!cardContainer.is(':last-child')) {
			return;
		}
		$('.card.selected').removeClass('selected');
		cardEl.addClass('selected');
		$('.clock-face').addClass('tableau-card-selected');
	},
	onClockCardClick: function(clockCardEl) {
		var cardToMoveEl = $('.tableau .card.selected');
		var foundation = clockCardEl.parent();
		if (this.canMoveCard(cardToMoveEl, clockCardEl)) {
			this.moveCardToClock(cardToMoveEl, foundation);
		}
	},
	canMoveCard: function(cardToMoveEl, clockCardEl) {
		var clockCardSuit = clockCardEl.attr('data-suit-name');
		var cardToMoveSuit = cardToMoveEl.attr('data-suit-name');
		if (cardToMoveSuit != clockCardSuit) {
			return false;
		}
		var clockCardName = clockCardEl.attr('data-card-name');
		var cardToMoveName = cardToMoveEl.attr('data-card-name');
		if (
			clockCardName == 'ace' && cardToMoveName == '2' ||
			clockCardName == '10' && cardToMoveName == 'jack' ||
			clockCardName == 'jack' && cardToMoveName == 'queen' ||
			clockCardName == 'queen' && cardToMoveName == 'king'
		) {
			return true;
		}
		var clockCardNum = parseInt(clockCardName, 10);
		var cardToMoveNum = parseInt(cardToMoveName, 10);
		return cardToMoveNum - 1 == clockCardNum;
	},
	moveCardToClock: function(cardToMoveEl, foundation) {
		var cardContainer = cardToMoveEl.parent();
		cardToMoveEl.appendTo(foundation).removeClass('selected');
		cardContainer.remove();
		$('.clock-face.tableau-card-selected').removeClass('tableau-card-selected');
	}
});
