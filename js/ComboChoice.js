enyo.kind({
	name: "usfl.ComboChoice",
	kind: enyo.ToolDecorator,
	classes: "usfl-combo-choice",

	published: {
		value: ""
	},

	components: [
		{ name: "choice" },
		{ kind: enyo.Image, src: "assets/search-input-cancel.png", onclick: "destroy" }
	],

	create: function() {
		this.inherited(arguments);
		this.valueChanged();
	},

	valueChanged: function() {
		this.$.choice.setContent(this.value);
	}
});
