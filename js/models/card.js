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
		//console.debug(this.get('name') + ' of ' + this.get('suit').get('name') + 's initialized');
	},
	compare: function(other) {
		var thisSuit = this.get('suit');
		var otherSuit = other.get('suit');
		var suitCompare = thisSuit.compare(otherSuit);
		if (suitCompare < 0) {
			return -1;
		}
		if (suitCompare > 0) {
			return 1;
		}
		var thisName = this.get('name');
		var otherName = other.get('name');
		return thisName.localeCompare(otherName);
	},
	equals: function(other) {
		return this.compare(other) == 0;
	}
}, {
	getCardNames: function() {
		return ['ace', 'queen', 'king', 'jack', '2', '3', '4', '5', '6', '7', '8', '9'];
	}
});
