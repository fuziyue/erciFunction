//先动态的生成<meta>；
var html = document.getElementsByTagName('html')[0];
var head = document.getElementsByTagName('head')[0];
var meta = document.createElement('meta');
meta.name = 'viewport';

var i = window.devicePixelRatio?1/window.devicePixelRatio:1;//像素比；
//设置<meta>的属性；
meta.content = 'width=device-width,user-scalable=no,initial-scale='+i+',minimum-scale='+i+',maximum-scale='+i;
head.appendChild(meta);

// 物理设备/x=设计图像素/我想定义的1rem=n（px）；
var w = window.innerWidth;
var num = w/18;
html.style.fontSize = num+'px';