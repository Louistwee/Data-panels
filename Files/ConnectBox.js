//improt $.connector
$.connectBox = function(connector){
	if(connector.box){
		return connector.box;
	}
	connector.box = document.createElement('span');
	var box = connector.box;
	box.isbox = true;
	box.lines = new Array();
	box.connector = connector;
	box.y = null;
	box.x = null;
	box.interval = setInterval(function(){
		if ($('body').find(box).length > 0) {
			var offset = $(box).offset();
			if(offset.left != box.x || offset.top != box.y){
				box.x = offset.left;
				box.y = offset.top;
				$(box).trigger('offset',offset);
			}
		}
	},10);
	//color
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
	//css
	$(box).css({
		width:10,
		height:10,
		borderStyle:'solid',
		position:'absolute',
		borderWidth:'2px',
	}).on('mousedown',function(){//draw line
		var pos = {
			mx:box.x,
			my:box.y,
			ex:box.x,
			ey:box.y,
		};
		var line = document.body.appendChild(document.createElement('div'));
		var updateline = function(x,y,mouse){
			if(mouse){
				pos.mx = x;
				pos.my = y;
			}else{
				pos.ex = x + 7;
				pos.ey = y + 7;
			}
			var	a = pos.mx - pos.ex,
        			b = pos.my - pos.ey,
        			length = Math.sqrt(a * a + b * b),
				sx = (pos.mx + pos.ex) / 2,
        			sy = (pos.my + pos.ey) / 2;
    			var 	x = sx - length / 2,
        			y = sy,
				angle = Math.PI - Math.atan2(-b, a);
			$(line).css({
				width:length,
				left:x,
				top:y,
				'-ms-transform': 'rotate('+angle+'rad)', /* IE 9 */
				'-webkit-transform': 'rotate('+angle+'rad)', /* Chrome, Safari, Opera */
				'transform': 'rotate('+angle+'rad)',
			});
		};
		$(line).css({
			backgroundColor:color,
			height:3,
			position:'absolute',
			borderRadius:'2px',
		});
		var ofssetfn = function(o){
			updateline(o.left,o.top,true);
		};
		var mousemovefn = function(e){
			updateline(e.pageX,e.pageY,true);
		};
		var mouseupfn = function(e){
			$(box).off('offset',ofssetfn);
			$(document).off('mousemove',mousemovefn);
			$(document).off('mouseup',mouseupfn);
			$(line).remove();
			var element = document.elementFromPoint(e.clientX, e.clientY);
			console.log(element);
			if(element.isbox){
				$.line(box,element);
			}
		};
		$(box).on('offset',ofssetfn);
		$(document).on('mousemove',mousemovefn);
		$(document).on('mouseup',mouseupfn);
	});
	//type
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
