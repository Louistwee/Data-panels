$.element = function(type,options){
	var defaults = $.element[type];
	var settings = $.extend( {}, defaults, options );
	if(settings.type === 'hidden'){
		//creates the element
		var element = $('div');
		element.css({
			boxShadow: '0px 0px 3px gray',
			position: 'absolute',
			width: 150,
			resize: 'vertical',
			overflowX: 'hidden',
			overflowY: 'auto',
			fontSize:20,
			fontFamily:'arial',
		});
		element.append($('div').css({
			padding:5,
			fontWeight:'bold',
			textAlign: 'center';
		}).text(type));
		element.inp =  {};
		for(var i in settings.inp){
			var inp = $('div').css({padding:5}).text(i);
			element.inp[i] = {
				boxPlace:$('span');
			}
			inp.prepend(element.inp[i].boxPlace);
			element.append(inp);
		}
		for(var i in settings.out){
			$.connect({});
			var out = $('div').css({padding:5,textAlign:'right'}).text(i);
			element.out[i] = {
				boxPlace:$('span');
			}
			inp.append(element.out[i].boxPlace);
			element.append(out);
		}
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
			change:function(inp,element,self){
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
$.connect.element
