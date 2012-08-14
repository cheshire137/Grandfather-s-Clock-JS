Card = Backbone.Model.extend({
	defaults: {
		name: 'ace',
		suit: new Suit()
	},
	validate: function(attributes) {
		if ($.inArray(attributes.name, this.constructor.getCardNames()) == -1) {
			return 'Invalid card name';
		}
	},
	initialize: function() {
		console.debug(this.get('name') + ' of ' + this.get('suit').get('name') + 's initialized');
	}
}, {
	getCardNames: function() {
		return ['ace', 'queen', 'king', 'jack', '2', '3', '4', '5', '6', '7', '8', '9'];
	}
});
