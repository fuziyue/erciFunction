(function(){	
	/* 
	*/
	window.jsonp = function(obj){
		//https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=nm&cb=sdsr;
		var opaction = {};
		for(var attr in obj.dataName){
			opaction[attr] = obj.dataName[attr];
		}
		
		var fn = 'jquery_'+ (''+Math.random()).substring(2);
		opaction[obj.fnName] = fn;
		
		var arr = [];
		for(var attr in opaction){
			arr.push(attr +'='+opaction[attr]);
		}
		
		window[fn] = function(data){
			obj.success(data);
			oS.remove();
		}

		//console.log(opaction)
		var oS = document.createElement('script');
		oS.src = obj.url+'?'+arr.join('&');
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(oS);
	};
})()