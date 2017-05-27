$.fn.drag = function(el){
	if ($(this).find(el).length > 0){
		var place = el;
		var el = this;
	}else if($(el).find(this).length > 0){
		var place = this;
		var el = el;
	}else if(el === 'remove'){
		place = this;
	}else{
		var el = el;
		var place = this;
	}
	var dragfn = function(){
		var dfn = {
			mousemove:function(e){
				var e = e.originalEvent;
				$(el).css({
					left:	'+=' + e.movementX,
					top:	'+=' + e.movementY,
				})
			},
			mouseup:function(){
				$(document).off(dfn);
			},
		};
		$(document).on(dfn);
		$(el).parent().append(el);
	};
	if(el === 'remove'){
		$(place).off(dragfn);
		return this;
	}
	$(place).on('mousedown',dragfn);
	return this;
}
