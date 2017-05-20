$.connect.line = function(box1,box2){
	var answ = $.connect.line.getLineBetween(box1,box2);
	console.log(answ);
	if(answ === 'sameType'){
		return;		// same type
	}else if(answ.remove){
		answ.remove();// remove line
	}else{
		var line = document.body.appendChild(document.createElement('div')); // no line
		for(var i in $.connect.line.fn){
			line[i] = $.connect.line.fn[i];
		}
		line.input = answ.output;
		line.output = answ.input;
		line.input.lines.push(line);
		line.output.lines.push(line);
		line.output.connector.connect(line.input.connector);
		$(line.output).on('offset',function(){line.update()});
		$(line.input).on('offset',function(){line.update()});
		$(line).css({
			backgroundColor:line.output.connector.color,
			height:3,
			position:'absolute',
			borderRadius:'2px',
		}).css({
			background: '-webkit-gradient(linear, left top, right top, from('+line.output.connector.color+'), to('+line.input.connector.color+'))'
		}).css({
			background: '-moz-linear-gradient(left, '+line.output.connector.color+' 0%, '+line.input.connector.color+' 100%)'
		});
		line.update();
		return line;
	}
};
$.connect.line.fn = {};
$.connect.line.fn.remove = function(){
	var index = this.input.lines.indexOf(this);
	if (index > -1) {
		array.splice(index, 1);
	}
	var index = this.output.lines.indexOf(this);
	if (index > -1) {
		this.output.lines.splice(index, 1);
	}
	$(this).remove();
	delete this;
};
$.connect.line.getLineBetween = function(box1,box2){
	if(box1.connector.type === 'output'){
		if(box2.connector.type === 'output'){
			return 'sameType';
		}else{
			var output = box1;
			var input = box2;
		}
	}else if(box2.connector.type === 'output'){
		var output = box2;
		var input = box1;
	}else{
		return 'sameType';
	}
	var l = {output:output,input:input};
	$.each(output.lines,function(index,line){
		if(line.input === input){
			l = line;
		}
	});
	return l;
};
$.connect.line.fn.dataBullet = function(){
	var d = $('<span>');
	$(this).append(d.css({
		width: 7,
		height: 7,
		marginLeft:-5,
		background: this.output.connector.color,
		position: 'absolute',
		top: -1.5,
		borderRadius: '50%',
		left: 0,
	}).animate({
		left:'100%'
	},{
		duration:1000,
		done:function(){
			d.remove();
		},
		easing:'linear',
	})[0]);
};
$.connect.line.fn.update = function(){
	var	w = 7;
	var 	x1 = this.output.x + 7,
		y1 = this.output.y + 7,
	 	x2 = this.input.x + 7,
		y2 = this.input.y + 7;
	var 	a = x1 - x2,
        	b = y1 - y2,
        	length = Math.sqrt(a * a + b * b),
		sx = (x1 + x2) / 2,
        	sy = (y1 + y2) / 2;
    	var 	x = sx - length / 2,
        	y = sy,
		angle = Math.PI - Math.atan2(-b, a);
	$(this).css({
		width:length,
		left:x,
		top:y,
		'-ms-transform': 'rotate('+angle+'rad)', /* IE 9 */
		'-webkit-transform': 'rotate('+angle+'rad)', /* Chrome, Safari, Opera */
		'transform': 'rotate('+angle+'rad)',
	});
};
