(function(window,$,undefined){
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
	$.connector.fn.box = function(){
		if(this.boxElement){
			return this.boxElement;
		}else{
			this.boxElement = $('<div></div>')[0];
			this.boxElement.connector = this;
			$(this.boxElement).css({
				width:5,
				height:5,
				borderStyle:'solid',
				position:'absolute',
				borderWidth:1,
				borderColor:'black',
			});
			if(this.type == 'output'){
				$(this.boxElement).css({
					borderColor:'transparent',
					backgroundColor:'black',
				});
			}else{//this.type == 'input'
				$(this.boxElement).css({
					borderColor:'black',
					backgroundColor:'transparent',
				});
			}
			return this.boxElement;
		}
	};
})(window,$)
