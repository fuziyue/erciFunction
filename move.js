//一次封装函数运动的规律function；
var Tween = {
		linear: function (t, b, c, d){
			return c*t/d + b;
		},
		easeIn: function(t, b, c, d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t, b, c, d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeBoth: function(t, b, c, d){
			if ((t/=d/2) < 1) {
				return c/2*t*t + b;
			}
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		easeInStrong: function(t, b, c, d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOutStrong: function(t, b, c, d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeBothStrong: function(t, b, c, d){
			if ((t/=d/2) < 1) {
				return c/2*t*t*t*t + b;
			}
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		elasticIn: function(t, b, c, d, a, p){
			if (t === 0) { 
				return b; 
			}
			if ( (t /= d) == 1 ) {
				return b+c; 
			}
			if (!p) {
				p=d*0.3; 
			}
			if (!a || a < Math.abs(c)) {
				a = c; 
				var s = p/4;
			} else {
				var s = p/(2*Math.PI) * Math.asin (c/a);
			}
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		elasticOut: function(t, b, c, d, a, p){
			if (t === 0) {
				return b;
			}
			if ( (t /= d) == 1 ) {
				return b+c;
			}
			if (!p) {
				p=d*0.3;
			}
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else {
				var s = p/(2*Math.PI) * Math.asin (c/a);
			}
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},    
		elasticBoth: function(t, b, c, d, a, p){
			if (t === 0) {
				return b;
			}
			if ( (t /= d/2) == 2 ) {
				return b+c;
			}
			if (!p) {
				p = d*(0.3*1.5);
			}
			if ( !a || a < Math.abs(c) ) {
				a = c; 
				var s = p/4;
			}
			else {
				var s = p/(2*Math.PI) * Math.asin (c/a);
			}
			if (t < 1) {
				return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
						Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			}
			return a*Math.pow(2,-10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
		},
		backIn: function(t, b, c, d, s){
			if (typeof s == 'undefined') {
			   s = 1.70158;
			}
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		backOut: function(t, b, c, d, s){
			if (typeof s == 'undefined') {
				s = 3.70158;  //回缩的距离
			}
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		}, 
		backBoth: function(t, b, c, d, s){
			if (typeof s == 'undefined') {
				s = 1.70158; 
			}
			if ((t /= d/2 ) < 1) {
				return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			}
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		bounceIn: function(t, b, c, d){
			return c - Tween['bounceOut'](d-t, 0, c, d) + b;
		},       
		bounceOut: function(t, b, c, d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
			}
			return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
		},      
		bounceBoth: function(t, b, c, d){
			if (t < d/2) {
				return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
			}
			return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
		}
};

//获取元素的样式,函数封装，封装的函数有一定的功能；
function getCss(obj,attr){
	//先声明一个变量num等于空值；
	var num = null;
	
	//判断是否在IE浏览器获取这个元素的样式；
	if (obj.currentStyle) {//是在IE浏览器获取这个元素的样式；
		num = obj.currentStyle[attr];
	} else{//不是在IE浏览器获取这个元素的样式；
		num = getComputedStyle(obj)[attr];
	};
	
	//判断这个样式是否是透明度（opacity）；
	if (attr == 'opacity') {//这个样式是透明度（opacity）；
		return parseFloat(num);
	} else{//这个样式不是透明度（opacity）；
		return Math.ceil(parseFloat(num));
	};
};


//动画封装函数；
function  move(obj,attr,target,time,type,fn,fnName) {
	//obj  ：目标元素；
	//attr : 变化的样式；
	//targer : 结束位置；
	//type ：运动的类型；
	//time ：运动时间；
	
	//运动的次数；
	var t = 0;
	
	//b是元素的初始值；
	var b = getCss(obj,attr);
	
	//用于关闭间隙定时器的钥匙；
	var timer = null;
	
	//d是定时器的次数；
	var d = time/20;
	
	//初始位置=结束位置-元素的宽度；
	var c = target - getCss(obj,attr);
	
	//已开启的间隙定时器重新赋值给timer，让timer不为空内容，用于下面关闭间隙定时器时所用到的下标序号；
	timer = setInterval(function(){
		t++;
		
		//元素的样式 = Tween的属性类型里的参数 + 单位；
		if(attr == 'opacity'){
				obj.style[attr] = Tween[type](t, b, c, d);
			}else{
				obj.style[attr] = Tween[type](t, b, c, d)+ 'px';
			};
		
		//判断如果fnName是函数，就会调用这个fnName函数，如果不是函数就不会报错（此判断就是为了防止报错）；
		if (typeof fnName == 'function') {
			fnName();
		};
		
		//判断运动的次数 = 定时器的次数时；
		if(t == d){
			//判断如果fn是函数，就会调用这个fn函数，如果不是函数就不会报错（此判断就是为了防止报错）；
			if (typeof fn == 'function') {
				fn();
			};
			
			//关闭间隙定时器；
			clearInterval(timer);
		};
	},20);
};

//封装多个样式一起变化的函数；
//fewMove(obj,{left:200,width:100});
function fewMove(obj,attrs,time,type,fn,fnName){
	//attrs是一个对象，样式的对象；
	
	var t = 0;
	var timer = null;
	var d = time/20;//执行的次数；
	
	var b = {};//初始值；
	var c = {};//差值；
	
	//初始值的集合；
	for(var i in attrs){
		b[i] = getCss(obj,i);//获取初始值里的属性值；
		c[i] = attrs[i] - b[i];//差值里的属性值=目标值-初始值；
	};
	
	clearInterval(timer);
	timer = setInterval(function(){
		t++;
		
		for(var k in attrs){
			//判断如果是透明度=k的话，就执行不需要单位的，不是就执行有单位的；
			if ('opacity' == k) {
				obj.style[k] = Tween[type](t, b[k], c[k], d);
			} else{
				obj.style[k] = Tween[type](t, b[k], c[k], d) + 'px';
			}
		};
		
		if (typeof fnName == 'function') {
			fnName();
		};
		
		if (t == d) {
			if (typeof fn == 'function') {
				fn();
			};
			clearInterval(timer);
		};
		
	},20);
	
};




