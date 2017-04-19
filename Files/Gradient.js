$.fn.cssGradient = function(type,start,end){
		$.each(this,function(i,element){
			element.style.background = start;
			element.style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr='"+start+"', endColorstr='"+end+"')";
			element.style.background = "-webkit-gradient(linear, left top, left bottom, from("+start+"), to("+end+"))";
			element.style.background = "-moz-linear-gradient(top,  "+start+",  "+end+")";
		})
		
};
