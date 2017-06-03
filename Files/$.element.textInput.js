$.element.textInput = {
	output:{
		text:{
			dataType:'string',
			value:'',
		},
	},
	elementType:'textInput',
	create:function(options){
		var settings = $.extend(true,{},this,options);
		var element = $.element.panel.create(settings);
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
				output.edit(output.inputBox.value);
			})[0],
			box:$.connect.box(output),
		},output);
		$(output.div).append(output.inputBox).append(output.box);//input & box to div
		$(element).append(output.div);//div to element
		return element;
	},
};
