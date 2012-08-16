SVGCardView = Backbone.View.extend({
	initialize: function() {
		this.render();
		//console.debug("SVGCardView initialized");
	},
	render: function() {
		var card = this.options.card;
		var variables = {card_name: card.get('name'), suit_name: card.get('suit').get('name')};
		var containerTmpl = _.template($('#svg-card-container').html(), variables);
		$(this.el).html(containerTmpl);
		var svgCardSel = '#svg-' + card.get('name') + '-' + card.get('suit').get('name');
		var svgCardTmpl = _.template($(svgCardSel).html(), {});
		$('.svg-card', $(this.el)).html(svgCardTmpl);
	}
});
