$(function(){
	var gdc=$("#gdc");
	console.log(gdc);
	//获取元素
	var g_left=$(".btn-left",gdc)[0];
	var g_right=$(".btn-right",gdc)[0];
	var gdc_img=$(".gdc")[0];
	var g_img=$(".gdc1");
	//console.log(g_img);
	//获取第一个li的宽度,利用时间函数经过指定时间滚动一li的宽度;
	var g_ow=parseInt(getStyle(g_img[0],"width"));
	//console.log(gow);
	//设置时间函数让隔一段时间自动滚动一个
	var t=setInterval(move,2500);
	//设置开关
	var flag=true;
	function move(){
		animate(gdc_img,{left:-g_ow},500,function(){
			var first=getFirst(gdc_img);
			//console.log(first);
			gdc_img.appendChild(first);
			gdc_img.style.left="0px";
			flag=true;
		});
	}
	//鼠标经过一张图片时，运动即停止，清除进程，但是无法清除变量;
	gdc_img.onmouseover=function(){
		clearInterval(t);
	}
	//当鼠标离开的时候，继续运行它的进程
	gdc_img.onmouseout=function(){
		t=setInterval(move,2500);
	}
	//当鼠标点击按钮时，运行一张图片，点击右按钮往左运动，点击左按钮往右运动
	g_right.onclick=function(){
		if(flag){
			flag=false;
			move();
		}
	}
	g_left.onclick=function(){
		if(flag){
			flag=false;
			moveL();
		}
	}
	function moveL(){
		var first=getFirst(gdc_img);
		var last=getLast(gdc_img);
		gdc_img.insertBefore(last,first);
		gdc_img.style.left=-g_ow+"px";
		animate(gdc_img,{left:0},500,function(){
				flag=true;
		});
	}
})