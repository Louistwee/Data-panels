var loadlist = {
	connect:{
		box:{},
		line:{},
	},
	element:{
		textInput:{},
	},
	dataTypes:{
		
	},
	fn:{
		drag:{},
	},
}
$.getScriptList = function(list,parent){
	if(list === {})return;
	for(var i in list){
		if(i === 'fn'){
			$.getScriptList(list[i],parent + '.fn');
		}else if(!(i in {})){
			$.getScript(parent +'.'+ i + '.js');
			$.getScriptList(list[i],parent + '.' + i);
		}
	}
}
$.getScriptList(loadlist,'../Files/$');
