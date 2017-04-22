$.fn.cssGradient = function(gradient){
	$(this).css('background',gradient)
		.css('background','-webkit-'+gradient)
		.css('background','-moz-'+gradient)
		.css('background','-ms-'+gradient)
		.css('background','-o-'+gradient);
};
//linear
