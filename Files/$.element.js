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
$.element.panel = {
	info:'',
	elementType:'panel',
	create:function(options){
		var element = $('<div>')[0];
		var settings = $.extend(true,{},this,options);
		$.extend(true,element,settings);
		//css for the box
		$(element).css({
			boxShadow: '0px 0px 3px gray',
			background:'white',
			position: 'absolute',
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
		return element;
	},
};
$.element.opperationPannel = {
	info:'',
	elementType:'opperationPannel',
	create:function(options){
		var settings = $.extend(true,{},this,options);
		var element = $.element.panel.create(settings);
		//css for the box
		for(var inputName in element.input){
			var input = element.input[inputName];
			input.element = element;
			input.type = 'input';
			$.connect(input);
			input.div = $('<div/>').css({padding:5}).text(inputName);
			var box = $.connect.box(input);
			$(box).css({
				position:'relative',
				left:-5,
			})
			input.div.prepend(box);
			$(element).append(input.div);
		}
		for(var outputName in element.output){
			var output = element.output[outputName];
			output.element = element;
			output.type = 'output';
			$.connect(output);
			output.div = $('<div/>').css({padding:5,textAlign:'right'}).text(outputName);
			var box = $.connect.box(output);
			$(box).css({
				position:'relative',
				left:5,
			})
			output.div.append(box);
			$(element).append(output.div);
		}
		return element;
	},
};
$.element.socket = {
	create:function(options){
		var settings = $.extend(true,{},this,options);
		var element = $.element.opperationPannel.create(settings);
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
};
$.element.parseJson = {
	create:function(options){
		var settings = $.extend(true,{},this,options);
		var element = $.element.opperationPannel.create(settings);
		return element;
	},
	input:{
		string:{
			dataType:'string',
			change:function(input){
				var element = this.element;
				element.output.object.edit(JSON.parse(input));
			},
			value:'',
		},
	},
	output:{
		object:{
			dataType:'object',
			value:'',
		},
		
	},
	info:'parse JSONstring to an object',
	elementType:'parseJSON',
};
$.element.console = {
	create:function(options){
		var settings = $.extend(true,{},this,options);
		var element = $.element.opperationPannel.create(settings);
		return element;
	},
	input:{
		variable:{
			dataType:'object',
			change:function(input){
				console.log(input);
			},
			value:'',
		},
	},
	output:{},
	info:'Logs an object in the console',
	elementType:'console',
}
$.element.setStorage = {
	create:function(options){
		var settings = $.extend(true,{},this,options);
		var element = $.element.opperationPannel.create(settings);
		return element;
	},
	input:{
		object:{
			dataType:'object',
			change:function(input){
				for(var i in input){
					localStorage.setItem(i, input[i] + '');
				}
			},
			value:'',
		},
	},
	output:{},
	info:'write localStorage',
	elementType:'setStorage',
};
$.element.readStorage = {
	create:function(options){
		var settings = $.extend(true,{},this,options);
		var element = $.element.opperationPannel.create(settings);
		window.onstorage = function(){
			if(e.key === element.input.key.value){
				element.output.value.edit(e.newValue);
			}
		};
		return element;
	},
	input:{
		key:{
			dataType:'string',
			change:function(input){
				this.value = input;
			},
			value:'',
		},
	},
	output:{
		value:{
			dataType:'string',
			value:'',
		}
	},
	info:'read localStorage',
	elementType:'readStorage',
};
