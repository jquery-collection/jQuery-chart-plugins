$(document).ready(function(){

	// ------------------------------
	// create the line chart
	
	$('#line-chart1, #line-chart2').linechart({ 
			'width': 350,
			'height': 300,
			
			'headerText': 'Header text',

			// additionalText: can contain additional values, must specify the text, size, alignment 
			// and x,y position
			'additionalText': [ [ ['Additional text'], [7], ['right'], [250], [50] ], 
				  [ ['More additional text'], [6], ['right'], [250], [65] ] ], 
			
			'plotAreaLeft': 80,
			'plotAreaRight': 300,
			'plotAreaTop': 100,
			'plotAreaBottom': 220,
			
			'axisColor': '#9C9C9B',
			
			'yAxisValues': [ '0', 
				'1', 
				'2', 
				'3', 
				'4', 
				'5', 
				'6' ],
			'yLabel': 'y Label',
			'yMaxValue': 7,
	      
			'xAxisValues': [ '0', 
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
			'xLabel': 'x Label',
			'xMaxValue': 24, 

		// imageLayers: can contain 1 or more images, must specify the source, width, height 
		// and x,y position
		'imageLayers': [ [ ['img/data1.svg'], [220], [120], [80], [100] ],
			[ ['img/data2.svg'], [220], [120], [80], [100] ] ],

		'planeColors': [ '#7AA6D2', '#2B3A49' ], 
		'planeLegend': [ 'Legend one', 'Legend two' ], 

		'legendAtBottom': true,
		
		'regularChartId': 'line-chart1',
	});
	
	// ------------------------------
	// popup click handler
	
	$('#popup-open').click(function(){
		$('#popup-wrapper').fadeIn(200);
		$('#main_content').fadeOut(200);
	});

	// ------------------------------
	// close click handler
	
	$('#popup-close').click(function(){
		$('#popup-wrapper').fadeOut(200);
		$('#main_content').fadeIn(200);
	});

});
