//improt $.connector
$.connectBox = function(connector){
	if(connector.box){
		return connector.box;
	}
	connector.box = document.createElement('span');
	var box = connector.box;
	box.lines = new Array();
	box.connector = connector;
	box.y = null;
	box.x = null;
	box.interval = setInterval(function(){
		if ($('body').find(box).length > 0) {
			var offset = $(box).offset();
			if(offset.x != box.x || offset.y != box.y){
				box.x = offset.x;
				box.y = offset.y;
				$(box).trigger('offset',offset);
			}
		}
	},10);
	if(connector.color){
		var color = connector.color;
	}else{
		var color = 'black';
		if($.typeToColor){
			if(connector.dataType in $.typeToColor){
				color = $.typeToColor[connector.dataType];
			}
		};
		connector.color = color;
	}
	$(box).css({
		width:10,
		height:10,
		borderStyle:'solid',
		position:'absolute',
		borderWidth:'2px',
	});
	if(connector.type == 'output'){
		$(box).css({
			borderColor:'white',
			backgroundColor:color,
		});
	}else{//connector.type == 'input'
		$(box).css({
			borderColor:color,
			backgroundColor:'white',
		});
	}
	return box;
};
