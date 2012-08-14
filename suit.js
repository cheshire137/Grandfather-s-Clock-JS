Suit = Backbone.Model.extend({
	defaults: {
		name: 'spade'
    },
	validate: function(attributes) {
		if ($.inArray(attributes.name, ['spade', 'heart', 'club', 'diamond']) == -1) {
			return 'Invalid suit name';
		}
    },
    initialize: function() {
        console.debug("Suit initialized");
    },
	getColor: function() {
		var name = this.get('name');
		if ('spade' == name || 'club' == name) {
			return 'black';
		}
		return 'red';
	}
});