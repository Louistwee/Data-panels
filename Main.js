(function(window,$,undefined){
	//connector object
	$.connector = function(obj){
		obj.connections = new Array();
		obj.__proto__ = $.connector.fn;
		return obj;
	};
	//__proto__ functions
	$.connector.fn = {};
	$.connector.fn.isConnectedWith = function(connector){
		var checkconnection = false
			$.each(obj.connections,function(index,connection){
				if(otherobj === connection){
					if(checkconnection){
						//remove double connections
						obj.connections.splice(index, 1);
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
	$.connector.fn.connect = function(otherobj){
		this.connections.push(otherobj);
		this.isconnected(otherobj);
		otherobj.connections.push(this);
		otherobj.isconnected(this);
	};
	//disconnect 
	$.connector.fn.disconnect = function(otherobj){
		$.each(this.connections,function(index,connection){
			if(otherobj === connection){
				this.connections.splice(index, 1);
			}
		});
		$.each(otherobj.connections,function(index,connection){
			if(this === connection){
				otherobj.connections.splice(index, 1);
			}
		});
	}
})(window,$)
