(function(window,$,undefined){
	$.fn.addConnector = function(obj){
		//create the element
		obj.connector = $('<div></div>')[0];
		//add the input element
		obj.element = $(this).get(0);
		//create the connections array;
		obj.connections = new Array();
		
		if(obj.type == 'output'){
			$(obj.element).on('input',function(){
				var value = this.value;
				$.each(obj.connections,function(index,connection){
					connection.change(value);
				})
			});
			
			
		}else{
			obj.change = function(value){
				obj.element.value = value;
			}
		}
		obj.isconnected = function(otherobj){
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
		obj.connect = function(otherobj){
			obj.connections.push(otherobj);
			obj.isconnected(otherobj);
			otherobj.connections.push(obj);
			otherobj.isconnected(obj);
		};
		obj.disconnect = function(otherobj){
			$.each(obj.connections,function(index,connection){
				if(otherobj === connection){
					obj.connections.splice(index, 1);
				}
			});
			$.each(otherobj.connections,function(index,connection){
				if(obj === connection){
					otherobj.connections.splice(index, 1);
				}
			});
		}
		return obj;
	}
})(window,$)
