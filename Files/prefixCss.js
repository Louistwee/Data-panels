$.fn.cssGradient = function(n,v){
	$(this).css(n,'-webkit-'+v).css(n,'-moz-'+v).css(n,'-ms-'+v).css(n,'-o-'+v).css(n,v);
};
//linear
