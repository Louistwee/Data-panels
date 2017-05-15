$.connect.element = function(name,panelsettings){
	var panel = document.createElement('div');
	var panelLeft = document.createElement('div');
	var panelRight = document.createElement('div');
	var panelCenter = document.createElement('div');
}
$.connect.element = {};
/*$.connect.panel.textarea = {
	create:function(settings){
		
	},
	type:'element',
}*/
$.connect.element.socket = {
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
	type:'hidden',
}
