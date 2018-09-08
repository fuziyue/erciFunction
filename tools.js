
(function(){
	// #list  .lis  li  获取元素
	window.$ = function (name,parent){
		parent = parent || document;
		var sey = name.substring(0,1);
		var all = parent.getElementsByTagName('*');
		var arr = [];
		
		if(sey == '#'){
			var id = name.substring(1);
			return parent.getElementById(id);
		}else if(sey == '.'){
			
			for(var i=0;i<all.length;i++){
				//  判断是否有class值
				if(all[i].className){
					//  "lis box pox"
					var cla = name.substring(1);
					var s = all[i].className.split(' ');
					for(var k=0;k<s.length;k++){
						if(s[k] == cla){
							
							arr.push(all[i]);
						}
					}
				}
			}
			return arr;
		}else{
			return parent.getElementsByTagName(name);
		}
	}
	
	
	//  给某个元素添加class
	window.addClass = function (obj,className){
		//obj.className = className;
		var oldClassArr = obj.className.split(' ');
		for(var i=0;i<oldClassArr.length;i++){
			if(oldClassArr[i] == className){
				return
			}
		}
		obj.className = oldClassArr.join(' ') +' '+ className;
	}
	
	
	//  删除某个元素的class
	window.removeClass = function (obj,className){
		var oldClassArr = obj.className.split(' ');	
		for(var i=0;i<oldClassArr.length;i++){
			if(oldClassArr[i] == className){
				// 判断成立，说明有可以删除的class
				oldClassArr.splice(i,1);
			}
		}
		obj.className = oldClassArr.join(' ');
	}
	
	
	// 封装的for循环
	window.forEach = function (arr,fn){
		for(var i=0;i<arr.length;i++){
			fn(i,arr[i]);
		}
	}
	
	//  封装的事件绑定
	window.bind = function(obj,event,fn){
		if(obj.attachEvent){
			obj.attachEvent('on'+event,function(){
				fn.call(obj);
			});
		}else{
			obj.addEventListener(event,fn)
		}
	}
	
	
	// 封装的拖拽
	window.addDarg = function(obj,fnDown,fnMove,fnUp){
		bind(obj,'mousedown',function(ev){
			if(typeof fnDown == 'function'){
				fnDown(ev);
			};
			
			bind(document,'mousemove',move);
			function move(ev){
				if(typeof fnMove == 'function'){
					fnMove(ev);
				};
			};
			function up(ev){
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
		}
	}

	window.wheel = function(obj,fnUp,fnDown){
		var str = window.navigator.userAgent;
		if(str.indexOf('Firefox') != -1){
			//是ff浏览器
			obj.addEventListener('DOMMouseScroll',function(ev){
				ev = ev || window.event;
				if(ev.detail > 0){ // 方向往下
					if(typeof fnDown == 'function'){
						fnDown();
					}
				}else{// 方向往上
					if(typeof fnUp == 'function'){
						fnUp();
					}
				}
				
				ev.preventDefault();
			})
		}else{ // 非ff
			obj.addEventListener('mousewheel',function(ev){
				ev = ev || window.event;
				if(ev.wheelDelta > 0){ // 方向往上
					if(typeof fnUp == 'function'){
						fnUp();
					}
				}else{// 方向往下
					if(typeof fnDown == 'function'){
						fnDown();
					}
				}
				ev.preventDefault();
			})
		}
	}
		 function wheel(obj,fnUp,fnDown){
				var str=window.navigator.userAgent;
				if(str.indexOf('Firefox')!=-1){
					obj.addEventListener('DOMMouseScroll',function(ev){
						ev=ev||window.event;
						if(ev.detail>0){
							if(typeof fnDown == 'function'){
                        		fnDown();
                        	}
						}else{
							if(typeof fnUp == 'function'){
                        		fnUp();
                        	}
						}
						ev.preventDefault();
					})
				}else{
					obj.addEventListener('mousewheel',function(ev){
						ev=ev||window.event;
                        if(ev.wheelDelta>0){
                        	if(typeof fnUp == 'function'){
                        		fnUp();
                        	}
                        }else{
                        	if(typeof fnDown == 'function'){
                        		fnDown();
                        	}
                        }
                        ev.preventDefault();
					})
				}
			}	



})()













