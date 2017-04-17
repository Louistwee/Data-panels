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
	};
	//change the output of #output
	$.connector.fn.edit = function(value){
		this.value = value;
		$.each(this.connections,function(index,connection){
			connection.change(value);
		});
	};
	//fired by #output
	$.connector.fn.change = function(value){
		if(this.element){
			this.element.value = value;
		}
	};
	//connect
	$.connector.fn.connect = function(otherConnector){
		this.connections.push(otherConnector);
		this.isConnectedWith(otherConnector);
		otherConnector.connections.push(this);
		otherConnector.isConnectedWith(this);
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
	}
})(window,$)
