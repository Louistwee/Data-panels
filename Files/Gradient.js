$.fn.cssGradient = function(gradient){
	$(this).css('background','-webkit-'+gradient).css('background','-moz-'+gradient).css('background','-ms-'+gradient).css('background','-o-'+gradient).css('background',gradient);
};
//linear
