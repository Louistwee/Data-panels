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
			line.css({
				
			});
		}
	};
	$.connectLine.fn = {};
	$.connectLine.fn.remove = function(){
		
	};
	$.connectLine.fn.dataBullet = function(){
		
};
