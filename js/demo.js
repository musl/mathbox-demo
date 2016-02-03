var Demo = (function() {
	var self;
	var mathbox;
	var mathbox_options;
	var three;

	mathbox_options = {
		plugins: ['core', 'controls', 'cursor', 'mathbox'],
		controls: {
			klass: THREE.OrbitControls
			//klass: THREE.TrackballControls
		}
	};

	self = {
		clear_color: new THREE.Color(0xFFFFFF),
		run: function() {
			var mathbox;
			var three;
			var camera;
			var view;
			var p, d;
			var data;
			var curve;

			var scale;
			var ticks;
			var format;
			var labels;

			mathbox = mathBox(mathbox_options);
			three = mathbox.three;

			three.renderer.setClearColor(this.clear_color, 2.0);

			camera = mathbox.camera({
				proxy: true,
				position: [0, 0, 3.5],
			});

			view = mathbox.cartesian({
				range: [[-2, 2], [-1, 1]],
				scale: [2, 1],
			});

			/*
			 * Calibrate the scaling unit so that objects on screen are
			 * the desired size.
			 */
			p = camera.get('position');
			d = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
			mathbox.set('focus', d);

			/*
			 * Grid
			 */
			view.axis({ axis: 1, width: 3 });
			view.axis({ axis: 2, width: 3 });
			view.grid({ width: 2, divideX: 20, divideY: 11 });
			mathbox.select('axis').set('color', 'black');

			scale = view.scale({
				divide: 2,
			});

		   	ticks = view.ticks({
				width: 5,
				size: 15,
				color: 'black',
			});

			format = view.format({
				digits: 2,
				weight: 'bold',
			});

			labels = view.label({
				color: 'black',
				zIndex: 1,
			});

			/*
			 * Data
			 */
			data = view.interval({
				expr: function(emit, x, i, t) {
					emit(x, 0.75 * Math.sin(1.4 * x + t) + 0.25 * Math.sin((4.0 + 2.0 * Math.sin(1.3 * x + t)) * x + t));
				},
				width: 64, // number of points
				channels: 2, // two axes
				live: true, // recalc as time changes?
			});

			curve = view.line({
				width: 5,
				color: '#3090FF',
			});

		},
		/*
		 * nasty hack to recieve un-checked messages.
		 */
		handle_message: function(e) {
			console.log(e.origin);
			if(e.data === 'reload') {
				window.location.reload();
			}
		}
	};

	// Register interest in cross-document messaging.
	window.addEventListener('message', self.handle_message, false);

	return self;

})();
