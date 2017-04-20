$.connectBox = function(connector){
	if(connector.box){
		return connector.box;
	}
	connector.box = $('<div></div>')[0];
	connector.box.lines = new Array();
	connector.box.connector = connector;
	connector.box.__proto__ = $.connectBox.fn;
	connector.box.y = null;
	connector.box.x = null;
	connector.box.interval = setInterval(function(){
		if($(connector.box).is('html *')){
			var offset = $(connector.box).offset();
			if(offset.x != connector.box.x || offset.y != connector.box.y){
				connector.box.x = offset.x;
				connector.box.y = offset.y;
				$(connector.box).trigger('offset',offset);
			}
		}
	},10);
	if(connector.box.color){
		var color = connector.box.color;
	}else{
		var color = 'black';
		//if(connector.dataType in $.dataTypeColors){
		//	color = $.dataTypeColors[connector.dataType];
		//}
		connector.box.color = color;
	}
	$(connector.box).css({
		width:5,
		height:5,
		borderStyle:'solid',
		position:'absolute',
		borderWidth:1,
		borderColor:color,
	});
	if(connector.box.type == 'output'){
		$(connector.box).css({
			borderColor:'white',
			backgroundColor:color,
		});
	}else{//connector.box.type == 'input'
		$(connector.box).css({
			borderColor:color,
			backgroundColor:'white',
		});
	}
	return connector.box;
};
$.connectBox.fn = {};
$.connectBox.fn.remove = function(){
		
};
