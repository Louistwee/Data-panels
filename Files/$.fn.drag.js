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
		var place = el;
		var el = this;
	}
	var dragfn = function(){
		document.on({
			mousemove:function(e){
				el.css({
					left:'+='+e.movementX,
					top: '+='+e.movementy,
				})
			},
			mouseup:function(){
				document.off(this);
			},
		});
	};
	if(el === 'remove'){
		$(place).off(dragfn);
		return this;
	}
	$(place).on(dragfn);
	return this;
}
