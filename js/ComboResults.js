enyo.kind({
	name: "usfl.ComboResults",
	kind: enyo.Group,
	classes: "usfl-combo-results",

	events: {
		onResultChosen: "",
		onPrepResult: ""
	},

	create: function() {
		this.inherited(arguments);
	},

	setResults: function(inResults) {
		this.destroyClientControls();
		enyo.forEach(inResults,this.addResult,this);
		var items = this.getClientControls();
		if (items.length) {
			items[0].setActive(true);
			this.render();
		} else {
			this.hide();
		}
	},

	addResult: function(inResult) {
		this.createComponent({
			kind: enyo.GroupItem,
			content: inResult,
			onmouseover: "activateResult",
			onmousedown: "prepResult",
			ontap: "tapResult"
		});
	},

	activateResult: function(inSender,inEvent) {
		inEvent.originator.setActive(true);
		return true;
	},

	prepResult: function(inSender,inEvent) {
		this.doPrepResult();
		return true;
	},

	tapResult: function(inSender,inEvent) {
		this.doResultChosen();
		return true;
	},

	next: function() {
		var items = this.getClientControls();
		if (items.length) {
			var activeIndex = enyo.indexOf(this.getActive(),items);
			items[(activeIndex + 1 >= items.length) ? activeIndex : activeIndex+1].setActive(true);
		}
	},

	prev: function() {
		var items = this.getClientControls();
		if (items.length) {
			var activeIndex = enyo.indexOf(this.getActive(),items);
			items[(activeIndex - 1 < 0) ? activeIndex : activeIndex-1].setActive(true);
		}
	},

	show: function() {
		var items = this.getClientControls();
		if (items.length) {
			this.inherited(arguments);
		}
	}
});
