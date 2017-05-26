$.element = function(options){
	if(typeof options === 'string'){
		var a = options;
		options = {elementType:a};
	}
	if(!options.elementType in $.element){
		return 'element not loaded';
	}else{
		var element = $.element[options.elementType].create(options,options.elementType);
	}
	return element;
}
$.element.socket = {
	create:function(options){
		var settings = $.extend(true,{},this,options);
		var element = $.element.panel.create(settings);
		return element;
	},
	input:{
		url:{
			dataType:'string',
			change:function(input){
				var element = this.element;
				if(element.socket) element.socket.close();
				element.socket = new WebSocket(input);
				element.socket.onmessage = function(e){
					element.output.data.edit(e.data);
				}
			},
			value:'',
		},
		data:{
			dataType:'string',
			change:function(input){
				var element = this.element;
				element.socket.send(input);
			},
			value:'',
		},
	},
	output:{
		data:{
			dataType:'string',
			value:'',
		},
		
	},
	info:'creates a websocket',
	elementType:'Socket',
}
$.element.panel = {
	info:'',
	elementType:'Panel',
	create:function(options){
		var element = $('<div>')[0];
		var settings = $.extend(true,{},this,options);
		$.extend(true,element,settings);
		//css for the box
		$(element).css({
			boxShadow: '0px 0px 3px gray',
			background:'white',
			position: 'relative',
			display:'inline-block',
			width:150,
			maxHeight: 300,
			margin:10,
			overflowX: 'hidden',
			overflowY: 'auto',
			fontSize:20,
			fontFamily:'arial',
			'-webkit-user-select': 'none',
			'-moz-user-select': 'none',
			'-ms-user-select': 'none',
			'user-select': 'none', 
		}).attr({title:settings.info}/*add a hover title*/).append($('<div/>').css({
			padding:5,
			fontWeight:'bold',
			textAlign: 'center',
		}).text(settings.elementType).drag(element));
		for(var inputName in element.input){
			var input = element.input[inputName];
			input.element = element;
			input.type = 'input';
			$.connect(input);
			input.div = $('<div/>').css({padding:5}).text(inputName);
			var box = $.connect.box(input);
			input.div.prepend(box);
			$(element).append(input.div);
		}
		for(var outputName in this.output){
			var output = element.output[inputName];
			output.element = element;
			output.type = 'output';
			$.connect(output);
			output.div = $('<div/>').css({padding:5,textAlign:'right'}).text(outputName);
			var box = $.connect.box(output);
			output.div.append(box);
			$(element).append(output.div);
		}
		return element;
	},
};
