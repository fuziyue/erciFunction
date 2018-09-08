(function(){
	// 封装存储数据的函数
	window.getCookies = function(name,value,time){
		// 判断是获取还是设置
		value = value||'';
		if(!value.trim()){
			// 获取;			
			var arr = document.cookie.split('; ');
			var obj = {};
			for(var i=0;i<arr.length;i++){
				var k = arr[i].split('=')[0];
				var v = arr[i].split('=')[1];
				obj[k] = v;
			}	;		
			return obj[name];
		}else{
			// 设置			
			var data = new Date();
			data.setDate(data.getDate()+time);			
			document.cookie = name+'='+value+'; expires='+data;	
		}	;
	};
	
	// 删除存储的数据	
	window.removeCookies = function(name){		
		var data = new Date();
		data.setDate(data.getDate()-1);
		document.cookie = name+'='+'dear; expires='+data;
	};
})()
