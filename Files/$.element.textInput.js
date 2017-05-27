$.element.textInput = {
	output:{
		text:{
			dataType:'string',
			value:'',
		},
	},
	elementType:'textInput',
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
		var output = settings.output.text;
		output.type = 'output';
		$.connect(output);
		$.extend(output,{
			element:element,
			div:$('<div/>').css({
				padding:5,
				textAlign:'right',
			})[0],
			inputBox:$('<input>').css({
				border:0,
				background:'white',
				boxShadow:'0 0 2px gray inset',
				fontSize:20,
				fontFamily:'arial',
				width: '100%',
			}).attr('type','text').on('input',function(){
				output.edit($(this).attr('value'))
			})[0],
			box:$.connect.box(output),
		},output);
		$(output.div).append(output.inputBox).append(output.box);//input & box to div
		$(element).append(output.div);//div to element
		return element;
	},
};
