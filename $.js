(function () {
	//fn('#box');//id;
	//fn('.box');//className;
	//fn('li');//TagName;
	//获取元素的函数；
	window.$ = function(name,parent){
		parent = parent || document;
		//是剪切字符串的'#';
		var mark = name.substring(0,1);
		//先获取所有元素；
		var all = parent.getElementsByTagName('*');
		var arr = [];
		//判断剪切字符串的第一个是否为'#';
		if (mark == '#') {
			//剪切字符串'#'后的所有字符；
			var id = name.substring(1);
			//是就通过id的方式获取元素；
			return parent.getElementById(id);
		}else if(mark == '.'){//判断剪切字符串的第一个是否为'.';
			//剪切字符串'.'后的所有字符；
			var classNames = name.substring(1);
			//排除没有class的所有元素；
			for (var i=0;i<all.length;i++) {//把每个元素都拿出来找；
				//判断所有元素里面是否有className的元素；
				if (all[i].className) {//进来就说明有className的元素；
					//是否要找的class
					//以空格为切割点，切割成数组；
					var nulls = all[i].className.split(' ');
					//循环把切割的nulls数组的每个class名取出来；
					for (var k=0;k<nulls.length;k++) {
						//判断切割的nulls数组的class名等于剪切字符串'.'后的所需要的字符；
						if (nulls[k] == classNames) {
							//添加给arr数组保存起来；
							arr.push(all[i]);
						}
					}
				}
			}
			return arr;//return document.getElementsByClassName(className);
		}else{
			//用标签名来获取；
			return parent.getElementsByTagName(name);
		}
	}
	
	//添加class属性样式函数；
	window.addClass = function(obj,className){
		//拆分过去的class成数组；
		var oldClassArr = obj.className.split(' ');
		//提取过去的class成数组；
		for (var i=0;i<oldClassArr.length;i++) {
			//判断过去的class和添加的class是否有相同的；
			if (oldClassArr[i] == className) {//有就结束不添加；
				return;
			}
		}
		//外面这个是没有相同的，就添加，添加因为是数组和字符串，所以就要用到数组个字符串的方法和字符串的拼接；
		obj.className = oldClassArr.join(' ') +' '+ className;
	}
	
	//删除class属性样式函数；
	window.removeClass = function(obj,className){
		//拆分过去的class成数组；
		var oldClassArr = obj.className.split(' ');
		//提取过去的class成数组；
		for (var i=0;i<oldClassArr.length;i++) {
			//进来说明有可以删除的class；
			if (oldClassArr[i] == className) {
				oldClassArr.splice(i,1);//删掉要删除的class；
			}
		}
		//把拆分过去的class数组拼接成字符串；
		obj.className = oldClassArr.join(' ');
	}
	
	//更多用于Tab切换功能；
	//参数一：元素；
	//参数二：事件名；
	//参数三：函数；
	window.bindingEvent = function (obj,event,fn){
		if (obj.attachEvent) {//判断是否是低版本IE浏览器；
			//是低版本IE浏览器；
			obj.attachEvent('on'+event,function(){
				fn.call(obj);
			});
		}else{
			//是非低版本IE浏览器；
			obj.addEventListener(event,fn);
		};
	};
	
	//for循环封装；
	window.forEach = function (arr,fn) {
		//提取每个inputs清除class属性；
		for (var i=0;i<arr.length;i++) {
			fn(i,arr[i]);
		};
	};
	
	//  封装的事件绑定
	window.bind = function(obj,event,fn){
		if(obj.attachEvent){
			obj.attachEvent('on'+event,function(){
				fn.call(obj);
			});
		}else{
			obj.addEventListener(event,fn)
		};
	};
	
	
	// 封装的拖拽
	window.addDarg = function(obj,fnDown,fnMove,fnUp){
		bind(obj,'mousedown',function(ev){
			ev = ev || window.event;
			if(typeof fnDown == 'function'){
				fnDown(ev);
			};
			
			bind(document,'mousemove',move);
			function move(ev){
				ev = ev || window.event;
				if(typeof fnMove == 'function'){
					fnMove(ev);
				};
			};
			function up(ev){
				ev = ev || window.event;
				document.removeEventListener('mousemove',move);
				document.removeEventListener('mouseup',up);
				if(typeof fnUp == 'function'){
					fnUp(move,up);
				};
			}
			bind(document,'mouseup',up);
			ev.preventDefault();
		});
	};
	
	
	//  封装的碰撞
	window.bong = function(obj1,obj2){
		var o1 = obj1.getBoundingClientRect();
		var o2 = obj2.getBoundingClientRect();
		var t1 = o1.top;
		var l1 = o1.left;
		var r1 = o1.right;
		var b1 = o1.bottom;
		
		var t2 = o2.top;
		var l2 = o2.left;
		var r2 = o2.right;
		var b2 = o2.bottom;
		if(r1>=l2&&b1>=t2&&l1<=r2&&t1<=b2){
			return true;
		}else{
			return false;
		};
	};
	
	//获取区间值随机数；
	//min:可以取最小值；
	//max:可以取最大值；
	//choose:最大、最小都可以取选择；
	window.getRandom = function(min,max,choose){
		switch (choose){
			case 'max':
				//向上取整（先随机X（最大值-最小值）+ 最小值）;
				return Math.ceil(Math.random()*(max-min)+min);
				break;
			case 'min': 
				//向下取整（先随机X（最大值-最小值）+ 最小值）;
				return Math.floor(Math.random()*(max-min)+min);
				break;
			case 'both': 
				//四舍五入取整（先随机X（最大值-最小值）+ 最小值）;
				return Math.round(Math.random()*(max-min)+min);
				break;
		};
	};
	
	//滚轮事件封装；
	window.wheel = function(obj,fnUp,fnDown){
		var str = window.navigator.userAgent;
		if (str.indexOf('Firefox') != -1) {//判断是否火狐；
			//是火狐；
			obj.addEventListener('DOMMouseScroll',function(event){
				event = event || window.event;
				if (event.detail > 0) {
					//方向往下；
					if (typeof fnDown == 'function') {
						fnDown();
					};
				} else{
					//方向往上；
					if (typeof fnUp == 'function') {
						fnUp();
					};
				};
				event.preventDefault();
			});
		} else{
			//非火狐；
			obj.addEventListener('mousewheel',function(event){
				event = event || window.event;
				if (event.wheelDelta > 0) {
					//方向往上；
					if (typeof fnUp == 'function') {
						fnUp();
					};
				} else{
					//方向往下；
					if (typeof fnDown == 'function') {
						fnDown();
					};
				};
				event.preventDefault();
			});
		};
	};
	
	window.ajax = function(){
		//method:方式；
		//url:地址；
		//date:数据；
		//asy:异步；
		//success:函数；
		function ajax(method,url,data,asy,success){
			var ajax = new XMLHttpRequest();
			//判断method是否有值；
			method = method || 'get';
			
			//是否异步；
			asy = asy || true;
			
			//判断是哪种传送方式；
			if (method == 'get') {
				//判断是否需要往后台穿送数据；
				if (data) {
					ajax.open('get',url+'?'+data,asy);
				}else{
					ajax.open('get',url,asy);
				};
				ajax.send();
			};
			
			if (method == 'post') {
				ajax.open('post',url,asy);
				ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
				//判断date存不存在；
				if (data) {
					ajax.send(data);
				}else{
					ajax.send();
				};
			};
			
			//用onreadystatechange兼容全部浏览器；
			ajax.addEventListener('readystatechange',function(){
				//判断ajax四部已经完成；
				if (ajax.readyState == 4) {
					//后台给我们的返回值是正确的；
					if (ajax.status>=200&ajax.status<=207) {//http状态码；
						success(ajax.responseText);
					}else{
						console.log(ajax.status);
					};
				};
			});
		};
	};
	
	
})();

