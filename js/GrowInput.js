/**
	_grow.Input_ is an input component that grows to fit the text it contains.  It is
	almost a direct port of the jQuery autoGrowInput plugin, created by James Padolsey, 
	to Enyo.  The original thread that spawned the jQuery plugin can be found here: 
	http://stackoverflow.com/questions/931207/is-there-a-jquery-autogrow-plugin-for-text-fields

	Enyo port by Matthew Sterritt
*/
enyo.kind({
	name: "usfl.GrowInput",
	kind: enyo.Input,

	published: {
		maxWidth: 200,
		minWidth: 0,
		comfortZone: 0
	},

	components: [
		{ tag: "span", name: "test" }
	],

	clear: function() {
		this.inherited(arguments);
		this.grow();
	},

	grow: function() {
		var t = this.$.test;
		t.applyStyle("position", "absolute");
		t.applyStyle("top", "-9999px");
		t.applyStyle("left", "-9999px");
		t.applyStyle("width", "auto");
		t.applyStyle("white-space", "pre");
		t.applyStyle("font-size",this.getComputedStyleValue("font-size","10px"));
		t.applyStyle("font-family",this.getComputedStyleValue("font-family","Arial"));
		t.applyStyle("font-weight",this.getComputedStyleValue("font-weight","bold"));
		t.applyStyle("letter-spacing",this.getComputedStyleValue("letter-spacing","normal"));
		t.applyStyle("padding",this.getComputedStyleValue("padding","auto"));
		t.setContent(this.getValue());	

		var testWidth = t.getBounds().width;
		var currentWidth = this.getBounds().width;
		var newWidth = ((testWidth + this.comfortZone) >= this.minWidth) ? (testWidth + this.comfortZone) : this.minWidth;
		if ((newWidth < currentWidth && newWidth >= this.minWidth) || (newWidth > this.minWidth && newWidth < this.maxWidth)) {
			this.setBounds({ width: newWidth }, "px");
		} else if (newWidth > this.maxWidth && currentWidth < this.maxWidth) {
			this.setBounds({ width: this.maxWidth }, "px");
		}
	},

	input: function() {
		this.inherited(arguments);
		this.grow();
	},

	rendered: function() {
		this.inherited(arguments);
		this.minWidth = this.minWidth || this.getBounds().width;
	}
});
