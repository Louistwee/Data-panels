(function(window,$,undefined){
	$.fn.addConnector = function(obj){
		obj.connector = $('<div></div>');
		obj.element = $(this).get(0);
		obj.connect = function(){
			
		};
		return obj;
	}
})(window,$)
