var Demo = (function() {
	var self;

	self = {
		clear_color: new THREE.Color(0xFFFFFF),
		mathbox_options: {
			plugins: ['core', 'controls', 'cursor', 'mathbox'],
			controls: {
				klass: THREE.OrbitControls
				//klass: THREE.TrackballControls
			}
		},
		calibrate: function(c, m) {
			var p, d;
			p = c.get('position');
			d = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
			m.set('focus', d);
		},
		run: function() {
			var fn, index;

			index = parseInt(self.get_url_param('index'));
			fn = self[index];

			if(typeof fn === 'function') {
				self[index].call(self);	
			}
		},
		get_url_param: function(name) {
			var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
			return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
		}
	};
	return self;

})();

Demo[0] = function() {
	var mathbox;
	var three;
	var camera;
	var view;
	var data;
	var curve;
	var scale;
	var ticks;
	var format;
	var labels;

	mathbox = mathBox(this.mathbox_options);
	three = mathbox.three;

	three.renderer.setClearColor(this.clear_color, 2.0);

	camera = mathbox.camera({
		proxy: true,
		position: [0, 0, 2],
	});

	this.calibrate(camera, mathbox);

	view = mathbox.cartesian({
		range: [[-1*π, π], [-1, 1]],
		scale: [2, 1],
	});

	view.axis({
		axis: 1,
		width: 2
	});

	view.axis({
		axis: 2,
		width: 2
	});

	view.grid({
		width: 1,
		unitX: π,
	});

	mathbox.select('axis').set('color', 'black');

	scale = view.scale({
		divide: 4,
		unit: π,
		zero: false,
	});

	ticks = view.ticks({
		width: 3,
		size: 15,
		color: 'black',
	});

	format = view.format({
		digits: 3,
	});

	labels = view.label({
		color: 'black',
		zIndex: 1,
	});

	data = view.interval({
		expr: function(emit, x, i, t) {
			emit(x, 0.75 * Math.sin(1.4 * x + t) + 0.25 * Math.sin((4.0 + 2.0 * Math.sin(1.3 * x + t)) * x + t));
		},
		width: 128,
		channels: 2,
	});

	curve = view.line({
		width: 5,
		color: '#3090FF',
		opacity: 0.5,
	});
}

Demo[1] = function() {
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
	var range;

	range = Math.PI;

	mathbox = mathBox(this.mathbox_options);
	three = mathbox.three;

	three.renderer.setClearColor(this.clear_color, 2.0);

	camera = mathbox.camera({
		proxy: true,
		position: [0, 0, 2.5],
	});

	view = mathbox.polar({
		bend: 1,
		range: [[-2*π, 2*π], [0, 1], [-1, 1]],
		scale: [2, 1, 1],
		helix: 0.1,
	});

	this.calibrate(camera, mathbox);

	view.transform({
      position: [0, 0.5, 0],
    }).axis({
      detail: 256,
    }).scale({
      divide: 10,
      unit: π,
      base: 2,
    }).ticks({
      width: 2,
	  opacity: 0.5,
    });

    view.axis({
      axis: 2,
    });

    view.transform({
      position: [π/2, 0, 0],
    }).axis({
      axis: 2,
    });

    view.transform({
      position: [-π/2, 0, 0],
    }).axis({
      axis: 2,
    });

	data = view.interval({
		expr: function(emit, x, i, t) {
			emit(x, 0.5 + 0.5 * (0.75 * Math.sin(1.4 * x + t) + 0.25 * Math.sin((4.0 + 2.0 * Math.sin(1.3 * x + t)) * x + t)));
		},
		width: 512, // number of points
		channels: 2, // two axes
		live: true, // recalc as time changes?
	}).line({
		width: 5,
		color: '#3090FF',
	});
  
  	view.area({
		width: 256,
		height: 2,
	}).surface({
		color: '#fff',
		opacity: 0.5,
		zBias: -10,
	});

	/*
	 * Grid
	 */
	view.grid({
		width: 1,
		unitX: π,
		baseX: 2,
		divideX: 10,
		detailX: 256,
		opacity: 0.5,
		zBias: -5,
		zOrder: -2,
	});

}

Demo[2] = function() {
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
	var range;

	range = Math.PI;

	mathbox = mathBox(this.mathbox_options);
	three = mathbox.three;

	three.renderer.setClearColor(this.clear_color, 2.0);

	camera = mathbox.camera({
		proxy: true,
		position: [0, 0, 2.5],
	});

	view = mathbox.polar({
		bend: 1,
		range: [[-2*π, 2*π], [0, 1], [-1, 1]],
		scale: [2, 1, 1],
	});

	this.calibrate(camera, mathbox);

	view.transform({
      position: [0, 0.5, 0],
    }).axis({
      detail: 256,
    }).scale({
      divide: 10,
      unit: π,
      base: 2,
    }).ticks({
      width: 2,
    });

    view.axis({
      axis: 2,
    });

	/*
    view.transform({
      position: [π/2, 0, 0],
    }).axis({
      axis: 2,
    });

    view.transform({
      position: [-π/2, 0, 0],
    }).axis({
      axis: 2,
    });
    */

	data = view.interval({
		expr: function(emit, x, i, t) {
			emit(x, 0.5 + 0.5 * Math.sin(2 * x + t));
		},
		width: 64, // number of points
		channels: 2, // two axes
		live: true, // recalc as time changes?
	}).line({
		width: 5,
		color: '#3090FF',
		opacity: 0.5,
	});
  
	data = view.interval({
		expr: function(emit, x, i, t) {
			emit(x, 0.5 + 0.5 * Math.cos(2 * x + t));
		},
		width: 64, // number of points
		channels: 2, // two axes
		live: true, // recalc as time changes?
	}).line({
		width: 5,
		color: '#30d080',
		opacity: 0.5,
	});
  
	/*
	 * Grid
	 */
	view.grid({
		width: 1,
		unitX: π,
		baseX: 2,
		divideX: 10,
		detailX: 256,
	});

}
