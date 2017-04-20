$.connectLine = function(box1,box2){
	if(false){//check if there is a line
		return;//return the line
	}else{
		var line = $('<div></div>')[0];
		box1.lines.push(line);
		box2.linse.push(line);
		if(box1.type == 'output'){
			line.input = box2;
			line.output = box1;
		}else{
			line.input = box1;
			line.output = box2;
		}
		var colorOut = line.output.color;
		var colorIn = line.input.color;
		var updateline = function(Newoffset){
			var x1 = line.output.x;
			var y1 = line.output.y;
			var x = line.input.x - x1;
			var y = line.input.y - y1;
			var angle = Math.atan2(x, y);
			var length = Math.sqrt(x*x+y*y);
			$(line).css({
				width:length,
				left:x1,
				top:y1,
				'-ms-transform': 'rotate('+angle+'rad)', /* IE 9 */
				'-webkit-transform': 'rotate('+angle+'rad)', /* Chrome, Safari, Opera */
				'transform': 'rotate('+angle+'rad)',
			});
		};
		$(line.input,line.output).on('offset',updateline);
		line.css({
			background:line.output.color,
			height:2,
		});
	}
};
$.connectLine.fn = {};
$.connectLine.fn.remove = function(){
	
};
$.connectLine.fn.dataBullet = function(){
	
};
