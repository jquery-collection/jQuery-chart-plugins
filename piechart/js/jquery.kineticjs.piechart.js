/*

Name: jquery.kineticjs.piechart.js
Description: A jQuery plugin that works with KineticJS to draw a pie chart using HTML5 Canvas.

Copyright 2012 Liquid State Ltd
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
The Software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the Software or the use or other dealings in the Software.

*/

(function( $ ){

	$.fn.kineticPieChart = function( options ) {

	    var settings = $.extend( {
			'color': '#f00',
			'backgroundColor': '#fff',
			'radius': 70, 
			'percentage': 70, 
			'label1': '',
			'label2': '',

			'fontFamily': 'SurfaceMedium, sans-serif', 

			'doubleSize': true, // optimise for retina display ipad 
	    }, options);
	    
		return this.each(function() {

			// begin: main
			
			var id = $(this).attr('id');
			var diameter = settings.radius * 2;
			var radiusAndThenSome = settings.radius + 10;

			var stage = new Kinetic.Stage({
				container: id,
				width: diameter,
				height: diameter
			});

			var backgroundLayer = new Kinetic.Layer();

			var background = new Kinetic.Rect({
				width: diameter,
	  			height: diameter,
	  			fill: settings.backgroundColor,
	  		});
			backgroundLayer.add(background);

			var firstPieHalfLayer = new Kinetic.Layer();

			var firstPieHalf = new Kinetic.Shape({
	  			drawFunc: function() {
	  				var context = this.getContext();
	  				
	  				var x = settings.radius;
	  				var y = settings.radius;
	  				var radius = settings.radius;
	  				var startAngle = 0.5 * Math.PI;
	  				var endAngle = 1.5 * Math.PI;
	  				var counterClockwise = false;
	  				
	  				context.beginPath();
	  				context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
	  				context.closePath();
	  				context.fillStyle = settings.color;
	  				context.fill();
	  			},
	  			x: settings.radius,
	  			y: settings.radius,
	  			offset: [settings.radius, settings.radius],
				rotationDeg: 0,
			});
			firstPieHalfLayer.add(firstPieHalf);

			var firstPieHalfMask = new Kinetic.Rect({
				x: settings.radius,
	  			y: settings.radius,
	  			offset: [radiusAndThenSome, settings.radius],
	  			rotation: Math.PI * 2,
	  			width: radiusAndThenSome,
	  			height: diameter,
	  			fill: settings.backgroundColor,
	  		});
			firstPieHalfLayer.add(firstPieHalfMask);
	        
			var firstPieHalfPercentageMask = new Kinetic.Rect({
				x: settings.radius,
	  			y: settings.radius,
	  			offset: [radiusAndThenSome, settings.radius],
	  			rotation: Math.PI * 2,
	  			width: radiusAndThenSome,
	  			height: diameter,
	  			fill: settings.backgroundColor,
	  			rotationDeg: - (settings.percentage / 100) * 360,
	  		});
			if (settings.percentage < 50)
				firstPieHalfLayer.add(firstPieHalfPercentageMask);
	        
			var secondPieHalfLayer = new Kinetic.Layer();
			
			var secondPieHalf = new Kinetic.Shape({
				drawFunc: function() {
					var context = this.getContext();
					
					var x = settings.radius;
					var y = settings.radius;
					var radius = settings.radius;
					var startAngle = 1.5 * Math.PI;
					var endAngle = 0.5 * Math.PI;
					var counterClockwise = false;
					
					context.beginPath();
					context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
					context.closePath();
					context.fillStyle = settings.color;
					context.fill();
				},
				x: settings.radius,
				y: settings.radius,
				offset: [settings.radius, settings.radius],
				rotationDeg: (100 - (settings.percentage / 100)) * 360,
				visible: false,
			});
			if (settings.percentage > 50)
				secondPieHalfLayer.add(secondPieHalf);

			var secondPieHalfMask = new Kinetic.Rect({
				x: settings.radius,
				y: settings.radius,
				offset: [radiusAndThenSome, settings.radius],
				rotation: Math.PI * 1,
				width: radiusAndThenSome,
				height: diameter,
				fill: settings.backgroundColor,
				visible: false,
			});
			if (settings.percentage > 50)
				secondPieHalfLayer.add(secondPieHalfMask);

			var labelLayer = new Kinetic.Layer();

	        var label1 = new Kinetic.Text({
				x: 0,
				y: settings.radius,
				text: settings.label1,
				fontSize: 16,
				fontFamily: settings.fontFamily,
				fontStyle: 'normal',
				textFill: '#fff',
				width: diameter,
				padding: 15,
				align: 'center',
				alpha: 0,
			});
			if (settings.label1 != '')
				labelLayer.add(label1);
			
	        var label2 = new Kinetic.Text({
				x: 0,
				y: settings.radius + 25,
				text: settings.label2,
				fontSize: 10,
				fontFamily: settings.fontFamily,
				fontStyle: 'normal',
				textFill: '#fff',
				width: diameter,
				padding: 15,
				align: 'center',
				alpha: 0,
			});
			if (settings.label2 != '')
				labelLayer.add(label2);
			
			stage.add(backgroundLayer);
			if (settings.percentage > 50)
				stage.add(secondPieHalfLayer);
			stage.add(firstPieHalfLayer);
			stage.add(labelLayer);
			
	        // scaling for different resolutions
			$(this).find('canvas').css('width', diameter).css('height', diameter);
			if (settings.doubleSize)
			{
		        stage.setScale(2, 2);
		        stage.setSize(diameter * 2, diameter * 2);
			}
			else 
			{
		        stage.setScale(1, 1);
		        stage.setSize(diameter, diameter);
			}

			// animate the first half of the pie chart
			firstPieHalfMask.transitionTo({
				rotation: Math.PI * 1,
				duration: .25,
				callback: function() {
					firstPieHalfMask.hide();

					if (settings.percentage > 50)
					{
						// animate the second half of the pie chart
						secondPieHalf.show();
						secondPieHalfMask.show();
						secondPieHalfMask.transitionTo({
							rotation: Math.PI * 0,
							duration: .25,
							callback: function() {
								secondPieHalfMask.hide();
							},
						});
					}

				},
			});

			// fade in the text
			setTimeout(function() {
			if (settings.label1 != '')
					label1.transitionTo({ alpha: 1, duration: .5 }); 
				if (settings.label2 != '')
					label2.transitionTo({ alpha: 1, duration: .5 }); 
			}, 500);
			
			// end: main

		});
			
	};

})( jQuery );