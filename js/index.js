
var Demos = {};

Demos.List = can.Control.extend({
	defaults: {
		demos: [],
		info_template: 'info_template',
		frame_template: 'templates/frame.stache'
	}
}, {
	update: function() {
		var doc;
		var content;
		var doc, html, body, b64doc;
		var index;

		this.element.empty();

		/*
		 * Show a nice info page if this wasn't served up over HTTP.
		 */
		if(!window.location.protocol.match(/^https?:$/)) {
			this.element.append(can.view(
				this.options.info_template,
				{ path: window.location.pathname.replace(/index.html$/, '') }
			));
			return;
		}

		for(i = 0; i < this.options.demos.length; i++) {
			index = this.options.demos[i];

			this.element.append(can.view(
				this.options.frame_template,
				{ index: index, reload: this.reload }
			));
		}
	},
	reload: function(id) {
		var frame;

		frame = $('#demo-' + id)[0]
		if(frame) frame.contentWindow.location.reload();
	}
});

$(document).ready(function() {
	var list;
   
	list = new Demos.List('#demos', { demos: [2, 1, 0] });
	list.update();
});

