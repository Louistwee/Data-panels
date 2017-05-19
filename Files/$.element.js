$.element = function(type,options){
	if(!options) options = {};
	var defaults = $.element[type];
	var settings = $.extend(true,{}, defaults, options );
	if(settings.type === 'hidden'){
		//creates the element
		var element = $('<div/>')[0];
		$(element).css({
			boxShadow: '0px 0px 3px gray',
			position: 'absolute',
			width: 150,
			resize: 'vertical',
			overflowX: 'hidden',
			overflowY: 'auto',
			fontSize:20,
			fontFamily:'arial',
			'-webkit-user-select': 'none',
			'-moz-user-select': 'none',
			'-ms-user-select': 'none',
			'user-select': 'none', 
		}).append($('<div/>').css({
			padding:5,
			fontWeight:'bold',
			textAlign: 'center',
		}).text(type));
		element.inp =  {};
		console.log(element);
		window.abc = element;
		for(var i in settings.inp){
			var inp = $('<div/>').css({padding:5,marginLeft:10}).text(i);
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
			var out = $('<div/>').css({padding:5,textAlign:'right',marginRight:10}).text(i);
			element.out[i] = {
				boxPlace:$('<span/>')[0],
			}
			out.append(element.out[i].boxPlace);
			$(element).append(out);
		}
	};
	//add the boxes
	console.log('a');
	$.extend(true,element.inp,settings.inp);
	for(var i in element.inp){
		console.log('b');
		$.connect(element.inp[i]);
		console.log('b2');
		$(element.inp[i].boxPlace).replaceWith($.connect.box(element.inp[i]));
		console.log('c');
	}
	$.extend(true,element.out,settings.out);
	console.log('d');
	for(var i in element.out){
		console.log('e');
		$.connect(element.out[i]);
		console.log('f');
		$(element.out[i].boxPlace).replaceWith($.connect.box(element.out[i]));
		console.log('g');
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
			change:function(inp,element){
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
			change:function(inp,element){
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
	type:'hidden',
}
