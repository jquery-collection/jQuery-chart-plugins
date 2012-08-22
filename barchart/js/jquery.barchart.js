/*

Name: jquery.barchart.js
Description: A jQuery plugin to draw a scalable bar chart using HTML and CSS.

*/

(function( $ ){

	$.fn.barchart = function( options ) {

		var settings = $.extend( {

			'color': '#000',
			'backgroundColor': '#fff',

			'width': 400,
			'height': 300,
			
			'headerText': 'Header text',

			// additionalText: can contain additional values, must specify the text, size, alignment 
			// and x,y position
			'additionalText': [ [ ['Additional text'], [7], ['right'], [50], [50] ], 
				  [ ['More additional text'], [6], ['right'], [50], [65] ] ], 
			
			'plotAreaLeft': 80,
			'plotAreaRight': 350,
			'plotAreaTop': 100,
			'plotAreaBottom': 260,
			
			'axisColor': '#000',
			
			'yAxisValues': [ '0', 
				'1', 
				'2', 
				'3', 
				'4', 
				'5', 
				'6', 
				'7', 
				'8', 
				'9', 
				'10' ],
			'yLabel': 'Label',
			'yMaxValue': 10,
	      
			'xAxisValues': [ 'Bar one', 
				  'Bar two', 
				  'Bar three' ],
			'markWidth': 3,

			// dataValues: can contain 1 or more data planes, must specify the value and the label 
			'dataValues': [ [ [ 5, '5' ], [ 5.5, '5.5' ], [ 5.9, '5.9' ] ], 
				  [ [ 3.4, '3.4'], [ 3.8, '3.8'], [ 4, '4'] ], 
				  [ [ 6.3, '6.3'], [ 7, '7'], [ 7.2, '7.2'] ] ],

			'barSpacing': 15, 
			'barBorder': false, 
			'doubleBarSpacingBetweenBarsButNotBetweenBarAndPlotAreaBorder': true, 
			'barColors': [ '#ccc', '#aaa', '#bbb', '#eee' ], // for specifying colours for each bar
			'planeBarColors': [ '#ccc', '#aaa', '#bbb' ], // for specifying colours for bars on different planes
			'planeLegend': [ 'Plane one', 'Plane two', 'Plane three' ], // for specifying the plane legend labels

			'fontFamily': 'SurfaceMedium', 
			
			'regularChartId': null, // for scaling: if any other charts should use the same data but display at different sizes, specify the chart with the default chart size here

		}, options);
	    
		return this.each(function() {

			// begin: main

			var id = $(this).attr('id');

			var adjustment = 1;
			// if this is the larger chart, adjust the size
			if (settings.regularChartId && id != settings.regularChartId)
			{
				var regularChartWidth = $('#' + settings.regularChartId).width();
				var largeChartWidth = $(this).width();
				adjustment = largeChartWidth / regularChartWidth;
				
				settings.width = Math.round(settings.width * adjustment);
				settings.height = Math.round(settings.height * adjustment);
				
				settings.plotAreaLeft = Math.round(settings.plotAreaLeft * adjustment);
				settings.plotAreaRight = Math.round(settings.plotAreaRight * adjustment);
				settings.plotAreaTop = Math.round(settings.plotAreaTop * adjustment);
				settings.plotAreaBottom = Math.round(settings.plotAreaBottom * adjustment);
				
				settings.markWidth = Math.round(settings.markWidth * adjustment);
				settings.barSpacing = Math.round(settings.barSpacing * adjustment);
			}

			var plotAreaWidth = settings.plotAreaRight - settings.plotAreaLeft;
			var plotAreaHeight = settings.plotAreaBottom - settings.plotAreaTop;
			var nrOfPlanes = settings.dataValues[0].length; // derive the number of planes from the first data object

			// add the background layer, 5px padding for rounded corners and drop shadow
			var backgroundMarkup = '<div class="background" '
				+ 'style="display: block; border: 1px solid ' 
				+ settings.backgroundColor 
				+ '; background-color: ' + settings.backgroundColor + '; ' 
				+ 'width: ' + (settings.width - 10) + 'px; ' 
				+ 'height: ' + (settings.height - 10) + 'px; '
				+ 'position: absolute; top: 5px; left: 5px;'
				+ '"></div>';
			$('#' + id).append(backgroundMarkup);

			// add the chart, bars and bar-values layers

			var xAxisLineMarkup = '<div class="xaxis" ' 
				+ 'style="display: block; border: none; background-color: ' 
				+ settings.axisColor + '; ' 
				+ 'width: ' + plotAreaWidth + 'px; ' 
				+ 'height: 1px; '
				+ 'position: absolute; '
				+ 'left: ' + settings.plotAreaLeft + 'px; '
				+ 'top: ' + settings.plotAreaBottom + 'px; ' 
				+ '"></div>';
			$('#' + id).append(xAxisLineMarkup);
			
	        // add the x-axis labels and data 
	        for(var n = 0; n < settings.dataValues.length; n++) {
				var i = n;
				var plotAreaWidth = settings.plotAreaRight - settings.plotAreaLeft;
				var nrOfxAxisValues = settings.xAxisValues.length;
				var nrOfBarGutters = nrOfxAxisValues + 1;
				var xAxisLabelWidth = plotAreaWidth / nrOfxAxisValues;

				var barsWidth;
				if (settings.doubleBarSpacingBetweenBarsButNotBetweenBarAndPlotAreaBorder)
					barsWidth = Math.round((plotAreaWidth - (settings.barSpacing 
						* (nrOfBarGutters * 2 - 2))) / nrOfxAxisValues);
				else 
					barsWidth = Math.round((plotAreaWidth - (settings.barSpacing * nrOfBarGutters)) 
						/ nrOfxAxisValues);

				// add the last mark
				if (i == 0)
				{
					var markMarkup = '<div style="display: block; border: none; background-color: ' 
						+ settings.axisColor + '; ' 
						+ 'width: 1px; ' 
						+ 'height: ' + settings.markWidth + 'px; '
						+ 'position: absolute; '
						+ 'left: ' + (settings.plotAreaLeft + plotAreaWidth) + 'px; '
						+ 'top: ' + settings.plotAreaBottom + 'px; ' 
						+ '"></div>';
					$('#' + id).append(markMarkup);
				}

				// add the axis mark
				var markSpacing = Math.round(i * (plotAreaWidth / nrOfxAxisValues));

				var markMarkup = '<div style="display: block; border: none; background-color: ' 
					+ settings.axisColor + '; ' 
					+ 'width: 1px; ' 
					+ 'height: ' + settings.markWidth + 'px; '
					+ 'position: absolute; '
					+ 'left: ' + (settings.plotAreaLeft + markSpacing) + 'px; '
					+ 'top: ' + settings.plotAreaBottom + 'px; ' 
					+ '"></div>';
				$('#' + id).append(markMarkup);
				
				// add the label
				var labelX;
				if (settings.doubleBarSpacingBetweenBarsButNotBetweenBarAndPlotAreaBorder)
					labelX = Math.round(i * xAxisLabelWidth);
				else 
					labelX = Math.round((i * barsWidth) + ((i + 1) * settings.barSpacing));

				var labelMarkup = '<div class="xaxislabel xaxislabel' + (i + 1) + ' "'
					+ 'style="display: block; border: none; ' 
					+ 'width: ' + xAxisLabelWidth + 'px; ' 
					+ 'position: absolute; '
					+ 'left: ' + (settings.plotAreaLeft + labelX) + 'px; '
					+ 'top: ' + (settings.plotAreaBottom + (10 * adjustment)) + 'px; ' 
					+ 'font-family: ' + settings.fontFamily + '; '
					+ 'font-size: ' + Math.round(6 * adjustment) + 'pt; '
					+ 'line-height: 1.4; text-align: center; '
					+ 'color: ' + settings.color + '; '
					+ '">' + settings.xAxisValues[i] + '</div>';
				$('#' + id).append(labelMarkup);

				// add the data bars with labels
				for(var barCount = 0; barCount < (nrOfPlanes); barCount++) {
					var barValue = settings.dataValues[i][barCount][0];
					var barheight = Math.round(barValue / settings.yMaxValue * plotAreaHeight);
					var barwidth = Math.round(barsWidth / nrOfPlanes);
					var barLeft = Math.round(
						(i * barsWidth) // clear any bar sets on the left
						+ ((i + 1) * settings.barSpacing) // clear any bar spacing on the left
						+ (barwidth * barCount)// clear any bars for the current bar set on the left
						+ (settings.doubleBarSpacingBetweenBarsButNotBetweenBarAndPlotAreaBorder ? 
							(i * settings.barSpacing) // clear the current bar set's spacing on the left
							: 0
						)
					)

					// if there's not a different colour for each bar (or set of bars on a plane), 
					// use the colour for the specific plane
					var barColor = (settings.barColors.length == nrOfPlanes) ? 
						settings.barColors[i]
						: settings.planeBarColors[barCount];

					// generate seperate divs for the bars, for animating, instead of one image
					var barMarkup = '<div class="bar bar' + (i + 1) + '" ' 
						+ 'style="display: block; border: 1px solid ' 
						+ (settings.barBorder ? settings.color : barColor) 
						+ '; background-color: ' + barColor + '; ' 
						+ 'width: ' + (barwidth - 2) + 'px; ' 
						+ 'height: ' + (barheight - 2) + 'px; '
						+ 'position: absolute; '
						+ 'left: ' + (settings.plotAreaLeft + barLeft) + 'px; '
						+ 'top: ' + (settings.plotAreaBottom - barheight) + 'px; ' 
						+ '"></div>';
					$('#' + id).append(barMarkup);

					var barMaskMarkup = '<div class="bar-mask bar' + (i + 1) + '-mask' + (barCount + 1) + '" '
						+ 'style="display: block; border: 1px solid ' 
						+ settings.backgroundColor 
						+ '; background-color: ' + settings.backgroundColor + '; ' 
						+ 'width: ' + (barwidth - 2) + 'px; ' 
						+ 'height: ' + (barheight - 2) + 'px; '
						+ 'position: absolute; '
						+ 'left: ' + (settings.plotAreaLeft + barLeft) + 'px; '
						+ 'top: ' + (settings.plotAreaBottom - barheight) + 'px; ' 
						+ '"></div>';
					$('#' + id).append(barMaskMarkup);

					// add the data labels
					var barlabelMarkup = '<div class="barlabel bar' + (i + 1) + 'label' + (barCount + 1) + '" ' 
						+ 'style="display: block; border: none; ' 
						+ 'width: ' + Math.round(barsWidth / nrOfPlanes) + 'px; ' 
						+ 'position: absolute; '
						+ 'left: ' + (settings.plotAreaLeft + barLeft) + 'px; '
						+ 'top: ' + (settings.plotAreaBottom - barheight - (10 * adjustment)) + 'px; ' 
						+ 'font-family: ' + settings.fontFamily + '; '
						+ 'font-size: ' + Math.round(6 * adjustment) + 'pt; '
						+ 'line-height: 1.4; text-align: center; '
						+ 'color: ' + settings.color + '; '
						+ '">' + settings.dataValues[i][barCount][1] + '</div>';
					$('#' + id).append(barlabelMarkup);


				}
	        }

			// add the planes legend
			// make sure the number of planes and labels 
			// are the same as we need the colours for the labels
			if (nrOfPlanes == settings.planeLegend.length) 
			{
				for(var legendCount = 0; legendCount < (nrOfPlanes); legendCount++) {
					var legendBoxSideLength = Math.round(14 * adjustment);
					var legendBoxSpacing = Math.round(7 * adjustment);
					var legendItemTop = settings.plotAreaTop - legendBoxSideLength 
							- (legendCount * (legendBoxSideLength + legendBoxSpacing)) + .5;
					var legendItemWidth = Math.round(200 * adjustment);

					var legendBoxMarkup = '<div class="legendbox legendbox' + (i + 1) + '" ' 
						+ 'style="display: block; border: 1px solid ' 
						+ settings.planeBarColors[nrOfPlanes - legendCount - 1] + '; '
						+ 'background-color: ' 
						+ settings.planeBarColors[nrOfPlanes - legendCount - 1] + '; ' 
						+ 'width: ' + legendBoxSideLength + 'px; ' 
						+ 'height: ' + legendBoxSideLength + 'px; '
						+ 'position: absolute; '
						+ 'left: ' + (settings.plotAreaRight - legendBoxSideLength) + 'px; '
						+ 'top: ' + legendItemTop + 'px; ' 
						+ '"></div>';
					$('#' + id).append(legendBoxMarkup);

					var legendLabelMarkup = '<div class="legendlabel legendlabel' + (i + 1) + '" '
						+ 'style="display: block; border: none; ' 
						+ 'width: ' + legendItemWidth + 'px; ' 
						+ 'position: absolute; '
						+ 'left: ' + (
							settings.plotAreaRight - legendBoxSideLength - legendItemWidth - Math.round(10 * adjustment)
							) + 'px; '
						+ 'top: ' + (
							legendItemTop + Math.round(5 * adjustment)
							) + 'px; ' 
						+ 'font-family: ' + settings.fontFamily + '; '
						+ 'font-size: ' + Math.round(6 * adjustment) + 'pt; '
						+ 'line-height: 1.4; text-align: right; '
						+ 'color: ' + settings.color + '; '
						+ '">' + settings.planeLegend[nrOfPlanes - legendCount - 1] + '</div>';
					$('#' + id).append(legendLabelMarkup);

				}
			}

			var yAxisLineMarkup = '<div style="display: block; border: none; background-color: ' 
				+ settings.axisColor + '; ' 
				+ 'width: 1px; ' 
				+ 'height: ' + plotAreaHeight + 'px; '
				+ 'position: absolute; '
				+ 'left: ' + settings.plotAreaLeft + 'px; '
				+ 'top: ' + settings.plotAreaTop + 'px; ' 
				+ '"></div>';
			$('#' + id).append(yAxisLineMarkup);

	        // add the y-axis marks and labels 

    		// add the label
			var yLabelMarkup = '<div class="ylabel" '
				+ 'style="display: block; border: none; ' 
				+ 'transform:rotate(-90deg); -ms-transform:rotate(-90deg); -moz-transform:rotate(-90deg); -webkit-transform: rotate(-90deg); -o-transform:rotate(-90deg); ' 
				+ 'position: absolute; '
				+ 'left: ' + (settings.plotAreaLeft - 250 - (40 * adjustment)) + 'px; '
				+ 'top: ' + (settings.plotAreaTop
					+ (plotAreaHeight / 2) - (10 * adjustment)
					) + 'px; ' 
				+ 'font-family: ' + settings.fontFamily + '; '
				+ 'font-size: ' + Math.round(8 * adjustment) + 'pt; '
				+ 'color: ' + settings.color + '; '
				+ 'width: 500px; '
				+ 'line-height: 1.4; text-align: center; '
				+ '">' + settings.yLabel + '</div>';
			$('#' + id).append(yLabelMarkup);

	        for(var n = 0; n < (settings.yAxisValues.length); n++) {
				var i = n;
				var markSpacing = Math.round(i * (plotAreaHeight 
					/ (settings.yAxisValues.length - 1)));

				// add the axis mark
				var markMarkup = '<div style="display: block; border: none; background-color: ' 
					+ settings.axisColor + '; ' 
					+ 'width: ' + settings.markWidth + 'px; ' 
					+ 'height: 1px; '
					+ 'position: absolute; '
					+ 'left: ' + (settings.plotAreaLeft - settings.markWidth) + 'px; '
					+ 'top: ' + (settings.plotAreaTop + markSpacing) + 'px; ' 
					+ '"></div>';
				$('#' + id).append(markMarkup);
				
				// add the label
				var labelMarkup = '<div class="yaxislabel yaxislabel' + (i + 1) + '" '
					+ 'style="display: block; border: none; ' 
					+ 'width: ' + Math.round(20 * adjustment) + 'px; ' 
					+ 'position: absolute; '
					+ 'left: ' + (settings.plotAreaLeft - settings.markWidth - (25 * adjustment)) + 'px; '
					+ 'top: ' + (settings.plotAreaTop + markSpacing - (5 * adjustment)) + 'px; ' 
					+ 'font-family: ' + settings.fontFamily + '; '
					+ 'font-size: ' + Math.round(6 * adjustment) + 'pt; '
					+ 'line-height: 1.4; text-align: right; '
					+ 'color: ' + settings.color + '; '
					+ '">' + settings.yAxisValues[(settings.yAxisValues.length - 1) - i] + '</div>';
				$('#' + id).append(labelMarkup);

	        }

    		// add additional text
			
			// add the header
			var headerTextMarkup = '<div class="header" '
				+ 'style="display: block; border: none; ' 
				+ 'width: ' + settings.width + 'px; ' 
				+ 'position: absolute; '
				+ 'top: ' + (15 * adjustment) + 'px; ' 
				+ 'font-family: ' + settings.fontFamily + '; '
				+ 'font-size: ' + Math.round(10 * adjustment) + 'pt; '
				+ 'line-height: 1.4; text-align: center; '
				+ 'color: ' + settings.color + '; '
				+ '">' + settings.headerText + '</div>';
			$('#' + id).append(headerTextMarkup);

	        for(var n = 0; n < settings.additionalText.length; n++) {
				var i = n;

				var textMarkup = '<div class="additional-text additional-text' + (i + 1) + '" '
					+ 'style="display: block; border: none; ' 
					+ 'position: absolute; '
					+ 'left: ' + (settings.additionalText[i][3] * adjustment) + 'px; ' 
					+ 'top: ' + (settings.additionalText[i][4] * adjustment) + 'px; ' 
					+ 'font-family: ' + settings.fontFamily + '; '
					+ 'font-size: ' + Math.round(settings.additionalText[i][1] * adjustment) + 'pt; '
					+ 'line-height: 1.4; text-align: ' + settings.additionalText[i][2][0] + '; '
					+ 'color: ' + settings.color + '; '
					+ '">' + settings.additionalText[i][0][0] + '</div>';
				$('#' + id).append(textMarkup);
	        }

			// end: main
		});
		
	};

})( jQuery );