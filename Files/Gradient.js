$.fn.cssGradient = function(type,start,end){
	$(this).css('background',start)
		.css('background','-webkit-'+type+'-gradient('+start+', '+end+');')
		.css('background','-moz-'+type+'-gradient('+start+', '+end+');')
		.css('background','-ms-'+type+'-gradient('+start+', '+end+');')
		.css('background','-o-'+type+'-gradient('+start+', '+end+');')
		.css('background',type+'-gradient('+start+', '+end+');')
	})
};
//linear
