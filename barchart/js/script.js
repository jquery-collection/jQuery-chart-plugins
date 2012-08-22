$(document).ready(function(){

	// ------------------------------
	// create the bar chart
	
	$('#bar-chart1, #bar-chart2').barchart({ 
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

		// dataValues: can contain 1 or more data planes, must specify the value and the label 
		'dataValues': [ [ [ 5, '5' ], [ 5.5, '5.5' ], [ 5.9, '5.9' ] ], 
			  [ [ 3.4, '3.4'], [ 3.8, '3.8'], [ 4, '4'] ], 
			  [ [ 6.3, '6.3'], [ 7, '7'], [ 7.2, '7.2'] ] ],

		'planeBarColors': [ '#7AA6D2', '#838D96', '#2B3A49' ], 
		'planeLegend': [ 'Plane one', 'Plane two', 'Plane three' ], 

		'regularChartId': 'bar-chart1',
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
