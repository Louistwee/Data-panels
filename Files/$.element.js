$.element = function(options){
	var element = $('<div>')[0];
	if(typeof options === 'string'){
		var a = options;
		options = {elementType:a};
	}
	if(!options.elementType in $.element){
		return 'element not loaded';
	}
	$.extend(true,element, $.element[options.elementType], options);
	element.create(element,options,$.element[options.elementType],options.elementType);
	//add the boxes
	for(var i in element.inp){
		$.connect(element.inp[i]);
		element.inp[i].type = 'input';
		$(element.inp[i].boxPlace).replaceWith($.connect.box(element.inp[i]));
		element.inp[i].element = element;
		
	}
	for(var i in element.out){
		$.connect(element.out[i]);
		element.out[i].type = 'output';
		$(element.out[i].boxPlace).replaceWith($.connect.box(element.out[i]));
		element.out[i].element = element;
	}
	return element;
}
$.element.socket = {
	create:function(){
	
	};
	inp:{
		url:{
			dataType:'string',
			change:function(inp){
				var element = this.element;
				if(element.socket) element.socket.close();
				element.socket = new WebSocket(inp);
				element.socket.onmessage = function(e){
					element.out.data.edit(e.data);
				}
			},
			value:'',
		},
		data:{
			dataType:'string',
			change:function(inp){
				var element = this.element;
				element.socket.send(inp);
			},
			value:'',
		},
	},
	out:{
		data:{
			dataType:'string',
			value:'',
		},
		
	},
	info:'creates a websocket',
}
$.element.panel = {
	create:function(element){
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
		}).attr({title:element.title || ''}/*add a hover title*/).append($('<div/>').css({
			padding:5,
			fontWeight:'bold',
			textAlign: 'center',
		}).text(type).drag(element));
		element.inp =  {};
		console.log(element);
		window.abc = element;
		for(var i in this.inp){
			var inp = $('<div/>').css({padding:5}).text(i);
			element.inp[i] = {
				boxPlace:$('<span/>')[0],
			}
			console.log(element.inp);
			inp.prepend(element.inp[i].boxPlace);
			$(element).append(inp);
		}
		element.out =  {};
		for(var i in this.out){
			$.connect({});
			var out = $('<div/>').css({padding:5,textAlign:'right'}).text(i);
			element.out[i] = {
				boxPlace:$('<span/>')[0],
			}
			out.append(element.out[i].boxPlace);
			$(element).append(out);
		}
	};
};
