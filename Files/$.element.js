$.element = function(type,options){
	if(!options) options = {};
	var defaults = $.element[type];
	var settings = $.extend(true,{}, defaults, options );
	if(settings.type === 'panel'){
		//creates the element
		var element = $('<div/>')[0];
		$(element).css({
			boxShadow: '0px 0px 3px gray',
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
		}).attr({title:element.title || ''}).append($('<div/>').css({
			padding:5,
			fontWeight:'bold',
			textAlign: 'center',
		}).text(type));
		element.inp =  {};
		console.log(element);
		window.abc = element;
		for(var i in settings.inp){
			var inp = $('<div/>').css({padding:5}).text(i);
			element.inp[i] = {
				boxPlace:$('<span/>')[0],
			}
			console.log(element.inp);
			inp.prepend(element.inp[i].boxPlace);
			$(element).append(inp);
		}
		element.out =  {};
		for(var i in settings.out){
			$.connect({});
			var out = $('<div/>').css({padding:5,textAlign:'right'}).text(i);
			element.out[i] = {
				boxPlace:$('<span/>')[0],
			}
			out.append(element.out[i].boxPlace);
			$(element).append(out);
		}
	};
	//add the boxes
	$.extend(true,element.inp,settings.inp);
	for(var i in element.inp){
		$.connect(element.inp[i]);
		element.inp[i].type = 'input';
		$(element.inp[i].boxPlace).replaceWith($.connect.box(element.inp[i]));
		element.inp[i].element = element;
		
	}
	$.extend(true,element.out,settings.out);
	for(var i in element.out){
		$.connect(element.out[i]);
		element.out[i].type = 'output';
		$(element.out[i].boxPlace).replaceWith($.connect.box(element.out[i]));
		element.out[i].element = element;
	}
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
				//send data to server
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
	type:'panel',
}
