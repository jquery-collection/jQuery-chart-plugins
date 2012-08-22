$(document).ready(function(){

	// ------------------------------
	// create the line chart
	
	$('#line-chart1, #line-chart2').linechart({ 
		'width': 350,
		'height': 300,

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
