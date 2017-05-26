$.element.textInput = {
	elementType:'textInput',
	create:function(options){
		var element = $('<div>')[0];
		var settings = $.extend(true,{},this,options);
		$.extend(true,element,options);
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
		}).attr({title:settings.info}/*add a hover title*/);
		
		var input = {
			type:'output',
		};
		var inputElement = $('<input/>').css({
			margin:5,
			fontWeight:'bold',
			textAlign: 'center',
		}).attr('placeholder',settings.elementType).drag(element).on('input',function());
		var box = $.connect.box(input);
    
		for(var inputName in element.input){
			var input = element.input[inputName];
			input.element = element;
			input.type = 'input';
			$.connect(input);
			input.div = $('<div/>').css({padding:5}).text(inputName);
			var box = ;
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
			output.div.append(box);
			$(element).append(output.div);
		}
		return element;
	},
};
