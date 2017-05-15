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
	resize:{
		type:'block',
	},
	resize:[
		{
			type:'block',
			width:400,
			height:400,
		},
		{
			type:'fluid',
			minWidth: 500,
			minHeight: 500,
			maxWidth:1000,
			maxHeight:1000,
		},
		{
			type:'else',
			then:'hide',
		},
	],
	onResize:function(){
	
	},
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
