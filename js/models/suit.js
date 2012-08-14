Suit = Backbone.Model.extend({
	defaults: {
		name: 'spade'
	},
	validate: function(attributes) {
		if ($.inArray(attributes.name, this.constructor.getSuitNames()) == -1) {
			return 'Invalid suit name';
		}
	},
	initialize: function() {
		console.debug("Suit " + this.get('name') + " initialized");
	},
	getColor: function() {
		var name = this.get('name');
		if ('spade' == name || 'club' == name) {
			return 'black';
		}
		return 'red';
	},
	compare: function(other) {
		var thisName = this.get('name');
		var otherName = other.get('name');
		return thisName.localeCompare(otherName);
	}
}, {
	getSuitNames: function() {
		return ['spade', 'heart', 'club', 'diamond'];
	}
});
