(function(window,$,undefined){
	$.dataTypeColors = {
		string:'#2ecc71',
	}
	//connector object
	$.connector = function(obj){
		obj.connections = new Array();
		obj.__proto__ = $.connector.fn;
		return obj;
	};
	//__proto__ functions
	$.connector.fn = {};
	$.connector.fn.isConnectedWith = function(otherConnector){
		var checkconnection = false
		$.each(this.connections,function(index,connection){
			if(otherConnector === connection){
				if(checkconnection){
					//remove double connections
					this.connections.splice(index, 1);
				}else{
					//set check true
					checkconnection = true;
				}
			}
		});
		return checkconnection;
	};
	//change the output of #output
	$.connector.fn.edit = function(value){
		if(value === undefined){
			return this.value;	
		}
		this.value = value;
		$.each(this.connections,function(index,connection){
			connection.change(value);
		});
		return this;
	};
	//fired by #output
	$.connector.fn.change = function(value){
		if(this.element){
			this.element.value = value;
		}
		return this;
	};
	//connect
	$.connector.fn.connect = function(otherConnector){
		this.connections.push(otherConnector);
		this.isConnectedWith(otherConnector);
		otherConnector.connections.push(this);
		otherConnector.isConnectedWith(this);
		return this;
	};
	//disconnect 
	$.connector.fn.disconnect = function(otherConnector){
		$.each(this.connections,function(index,connection){
			if(otherConnector === connection){
				this.connections.splice(index, 1);
			}
		});
		$.each(otherConnector.connections,function(index,connection){
			if(this === connection){
				otherConnector.connections.splice(index, 1);
			}
		});
		return this;
	};
	//box
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
			var offset = $(connector.box).offset();
			if(offset.x != connector.box.x || offset.y != connector.box.y){
				$(connector.box).trigger('offsetchange',offset);
			}
		},10);
		if(connector.box.color){
			var color = connector.box.color;
		}else{
			var color = 'black';
			if(connector.dataType in $.dataTypeColors){
				color = $.dataTypeColors[connector.dataType];
			}
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
	$.connectLine = function(box1,box2){
		if(false){//check if there is a line
			return;//return the line
		}else{
			var line = $('<div></div>')[0];
			line.css({
			
			});
		}
	};
	$.connectLine.fn = {};
	$.connectLine.fn.remove = function(){
		
	};
	$.connectLine.fn.dataBullet = function(){
		
	};
})(window,$)
