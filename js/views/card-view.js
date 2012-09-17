CardView = Backbone.View.extend({
	initialize: function() {
		this.render();
		//console.debug("CardView initialized");
	},
	render: function() {
		var card = this.options.card;
		var cardName = card.get('name');
		var suitName = card.get('suit').get('name');
		
		var variables = {card_name: cardName, suit_name: suitName};
		var containerTmpl = _.template($('#svg-card-container').html(), variables);
		$(this.el).html(containerTmpl);
		var svgCardSel = '#svg-' + cardName + '-' + suitName;
		var svgCardTmpl = _.template($(svgCardSel).html(), {});
		$('.svg-card', $(this.el)).html(svgCardTmpl);
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
	onTableauCardClick: function(newSelectedCard) {
		var cardContainer = newSelectedCard.parent();
		if (!cardContainer.is(':last-child')) {
			return;
		}
		var existingSelectedCard = $('.card.selected');
		if (existingSelectedCard.length > 0) {
			if (this.canMoveCardInTableau(existingSelectedCard, newSelectedCard)) {
				$('.clock-face').removeClass('tableau-card-selected');
				var foundation = newSelectedCard.closest('.foundation');
				this.moveCardInTableau(existingSelectedCard, foundation);
				return;
			}
		}
		$('.card.selected').removeClass('selected');
		newSelectedCard.addClass('selected');
		$('.clock-face').addClass('tableau-card-selected');
	},
	onClockCardClick: function(clockCardEl) {
		var cardToMoveEl = $('.tableau .card.selected');
		if (this.canMoveCardToClock(cardToMoveEl, clockCardEl)) {
			var foundation = clockCardEl.parent();
			this.moveCardToClock(cardToMoveEl, foundation);
		}
	},
	hasOneStepDifference: function(cardName1, cardName2) {
		if (
			cardName1 == 'ace' && cardName2 == '2' ||
			cardName1 == '10' && cardName2 == 'jack' ||
			cardName1 == 'jack' && cardName2 == 'queen' ||
			cardName1 == 'queen' && cardName2 == 'king'
		) {
			return true;
		}
		var cardNum1 = parseInt(cardName1, 10);
		var cardNum2 = parseInt(cardName2, 10);
		return cardNum2 - 1 == cardNum1;
	},
	canMoveCardInTableau: function(cardToMove, cardUnderneath) {
		var cardToMoveName = cardToMove.attr('data-card-name');
		var cardUnderneathName = cardUnderneath.attr('data-card-name');
		return this.hasOneStepDifference(cardToMoveName, cardUnderneathName);
	},
	canMoveCardToClock: function(cardToMoveEl, clockCardEl) {
		var clockCardSuit = clockCardEl.attr('data-suit-name');
		var cardToMoveSuit = cardToMoveEl.attr('data-suit-name');
		if (cardToMoveSuit != clockCardSuit) {
			return false;
		}
		var clockCardName = clockCardEl.attr('data-card-name');
		var cardToMoveName = cardToMoveEl.attr('data-card-name');
		if (cardToMoveName == 'ace' && clockCardName == 'king') {
			return true;
		}
		return this.hasOneStepDifference(clockCardName, cardToMoveName);
	},
	moveCardInTableau: function(cardToMove, foundation) {
		var cardContainer = cardToMove.parent();
		foundation.append(cardContainer);
		cardContainer[0].className.replace(
			/(card-container-)(\d+)/,
			function(fullMatch, prefix, digit) {
				var newContainerNum = parseInt(digit, 10) + 1;
				return prefix + newContainerNum;
			}
		);
		cardToMove.removeClass('selected');
	},
	moveCardToClock: function(cardToMoveEl, foundation) {
		var cardContainer = cardToMoveEl.parent();
		cardToMoveEl.appendTo(foundation).removeClass('selected');
		cardContainer.remove();
		$('.clock-face.tableau-card-selected').removeClass('tableau-card-selected');
	}
});
