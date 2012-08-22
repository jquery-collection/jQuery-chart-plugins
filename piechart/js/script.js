$(document).ready(function(){
	
	// ------------------------------
	// fade in the elements and animate the pie charts.
	
	// the initial hidden state of these elements are set in style_adjustments
	
	$('#pie-chart1').kineticPieChart({ 
		color: '#2B3A49', 
		radius: 72, 
		percentage: 70.5, 
		label1: '72%',
	});

	setTimeout(function() {
		$('#pie-chart2').kineticPieChart({ 
			color: '#7AA6D2', 
			radius: 90, 
			percentage: 90, 
			doubleSize: true, 
			label1: '90%',
		});
	}, 500);

});
