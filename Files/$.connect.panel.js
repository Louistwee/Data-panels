$.element = function(type,options){
	var defaults = $.element[type];
	var settings = $.extend( {}, defaults, options );
	if(settings.type === 'hidden'){
		//creates the element
		var element = $('div');
		element.css({
			background:'white',
			border:'1 px solid black',
			
		});
		
	};
	//append the element to the body element (if it exist), return it or append it to an other element;
	if(settings.parent === 'return'){
		return element;
	}else if(settings.parent){
		$(settings.parent).append(element);
	}else if(!document.body){
		$(function(){
			$('body').append(element);
		});
	}else{
		$('body').append(element);
	}
	return element;
}
$.element.socket = {
	inp:{
		url:{
			dataType:'string',
			change:function(inp,element,self){
				self.out.data.removeEvent(element.socket.onmessage);
				element.socket.close();
				element.socket = new WebSocket(inp);
				self.out.data.addEvent(element.socket.onmessage);
			},
		},
		data:{
			dataType:'string',
			change:function(inp,element,self){
				
			},
		},
	},
	out:{
		data:{
			dataType:'string',
			event:function(event,element,self){
				return event.data;
			},
			value:'',
		},
		
	},
	info:'creates a websocket',
	type:'hidden',
}
$.connect.element
