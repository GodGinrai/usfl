enyo.kind({
	name: "usfl.Combobox",
	kind: enyo.ToolDecorator,
	classes: "onyx-input-decorator usfl-combobox",

	tags: new Array(),
	clickFlag: false,
	backspaceFlag: false,

	published: {
		allowAdd: false
	},

	handlers: {
		onResultChosen: "resultChosen",
		onPrepResult: "prepResult"
	},

	components: [
		{ kind: usfl.GrowInput, name: "input", classes: "onyx-input", onkeyup: "checkKeys", onkeydown: "deleteHandler", onfocus: "showResults", onblur: "hideResults" },
		{ kind: usfl.ComboResults, name: "results" },
	],

	create: function() {
		this.inherited(arguments);
		if ("value" in this) {
			this.setValue(this.value);
		}
	},

	createChoice: function(inValue) {
		this.createComponent({
			kind: usfl.ComboChoice,
			value: inValue,
			addBefore: this.$.input
		});
	},

	addChoice: function(inValue) {
		this.createChoice(inValue);
		this.render();
		this.$.input.focus();
	},

	buildResults: function() {
		var choices = enyo.filter(this.tags,this.isChoice,this);
		return enyo.filter(choices,this.match,this);
	},

	checkKeys: function(inSender,inEvent) {
		if (inEvent.keyCode !== 8) {
			var chosen = this.getChosen();
			if (chosen.length) {
				chosen[chosen.length - 1].removeClass("usfl-combo-delete");
			}
		}
		if (inEvent.keyCode === 38) {
			this.$.results.prev();
		} else if (inEvent.keyCode === 40) {
			this.$.results.next();
		} else {
			if (inEvent.keyCode === 13) {
				var results = this.buildResults();
				if (!results.length) {
					var value = this.$.input.getValue();
					if (this.allowAdd && value !== "") {
						this.tags.push(value);
						this.tags.sort();
						this.addChoice(value);
						this.$.input.clear();
					}
				} else {
					this.addChoice(this.$.results.getActive().getContent());
					this.$.input.clear();
				}
			}
			this.updateChoices();
		}
	},

	deleteHandler: function(inSender,inEvent) {
		if (inEvent.keyCode === 8 && this.$.input.getValue() == "") {
			var chosen = this.getChosen();
			if (chosen.length) {
				if (chosen[chosen.length - 1].hasClass("usfl-combo-delete")) {
					chosen[chosen.length - 1].destroy();
				} else {
					chosen[chosen.length - 1].addClass("usfl-combo-delete");
					this.backspaceFlag = true;
				}
			}
		}
	},

	updateChoices: function() {
		var results = this.buildResults();
		this.$.results.setResults(results);
		this.$.results.show();
	},

	isChoice: function(inChoice) {
		var chosen = this.getChosen();
		for (choice in chosen) {
			if (chosen[choice].getValue().match(inChoice)) {
				return false;
			}
		}
		return true;
	},

	getChosen: function() {
		return enyo.filter(this.getClientControls(),this.isChosen,this);
	},

	getValue: function() {
		return enyo.map(this.getChosen(), this.grabValue, this);
	},

	setValue: function(inValues) {
		enyo.forEach(inValues,this.createChoice,this);
		this.render();
	},


	grabValue: function(inComponent) {
		return inComponent.getValue();
	},

	isChosen: function(inKind) {
		return inKind.hasClass("usfl-combo-choice");
	},

	match: function(inData) {
		return (inData.toLowerCase().search(this.$.input.getValue().toLowerCase()) >= 0) ? true : false;
	},

	removeComponent: function() {
		this.inherited(arguments);
		if (!this.backspaceFlag) {
			this.$.input.blur();
		} else {
			this.backspaceFlag = false;
		}
	},

	showResults: function() {
		this.updateChoices();
	},

	hideResults: function() {
		if (!this.clickFlag) {
			this.$.results.hide();
		}
		this.backspaceFlag = false;
		var chosen = this.getChosen();
		if (chosen.length) {
			chosen[chosen.length - 1].removeClass("usfl-combo-delete");
		}
	},

	rendered: function() {
		this.inherited(arguments);
		this.tags.sort();
		this.$.results.hide();
	},

	prepResult: function() {
		this.clickFlag = true;
	},

	resultChosen: function() {
		if (this.clickFlag) {
			this.addChoice(this.$.results.getActive().getContent());
			this.$.input.clear();
			this.clickFlag = false;
		}
		this.$.input.blur();
	},

	tap: function(inSender,inEvent) {
		this.$.input.focus();
	}
});
