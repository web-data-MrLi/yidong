
function getClass(classname,range){
	if(document.getElementsByClassName){
		return range.getElementsByClassName(classname);
	}
	else{
		var all=range.getElementsByTagName("*");
		var arr=[];
		for(var i=0;i<all.length;i++){
			if(checkClass(all[i].className,classname)){
				arr.push(all[i]);
			}
		}
		return arr;
	}
}

function checkClass(tagClass,classname){
	var aa=tagClass.split(" ");
	for(var i=0;i<aa.length;i++){
		if(aa[i]==classname){
			return true;
		}
	}
	return false;
}

// 获取文本内容
// 设置文本内容
function text(obj,val){
	/*alert("|"+obj.textContent+"|");
	""*/
	if(val==undefined){
		if(obj.textContent!=undefined){
			return obj.textContent;
		}
		else{
			return obj.innerText;
		}
	}
	else{
		if(obj.textContent!=undefined){
			obj.textContent=val;
		}
		else{
			obj.innerText=val;
		}	
	}
}

//判断获取还是设置
//设置
//浏览器兼容性
//获取
//判断浏览器兼容
function getContent(obj,value){
	if(value){
		if(obj.innerText){
			obj.innerText=value;
		}else{
			obj.textContent=value;
		}
	}else{
		if(obj.innerText){
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}
}
// 函数获取样式的方法
// 获取通用样式  getStyle(obj,attr)
// obj  要获取的对象
// attr  要获取的属性
// border-width
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return window.getComputedStyle(obj,null)[attr];
	}
}


function $(selector,range){
	if(typeof selector=="string"){
		// return('获取');
		// 如果传了range参数时候将range赋值给range否则将document赋给range
		var range=range||document;
		// 获取ID
		if(selector.charAt(0)=="#"){
			return document.getElementById(selector.slice(1));
		}
		// 获取类名
		if(selector.charAt(0)=="."){
			return getClass(selector.substr(1),range);
		}
		// 获取标签名
		if(/^[a-zA-Z][a-zA-Z1-6]{0,9}$/.test(selector)){
			return range.getElementsByTagName(selector);
		}
		// 创建元素/标签
		if(/^<[a-zA-Z][a-zA-Z1-6]{0,9}>$/.test(selector)){
			return document.createElement(selector.slice(1,-1));
		}
	}
	else if(typeof selector=="function"){
		// return('函数');
		window.onload=selector;
	}
}


// 获取子元素节点时所遇到的空格和注释问题
function getChilds(obj){
	var childs=obj.childNodes;
	var newArr=[];
	for(var i=0;i<childs.length;i++){
		if(!(childs[i].nodeType==8||(childs[i].nodeType==3&&trim(childs[i].nodeValue)==""))){
			newArr.push(childs[i]);
		}
	}
	return newArr;
}

// 用空元素代替空格 正则表达式  把字符串左右两边的空格替换为空元素
function trim(str){
	return str.replace(/^\s|\s+$/g,"");
}

// 获取第一个节点的方法
function getFirst(obj){
	return getChilds(obj)[0];
}

// 获取最后一个节点的方法
function getLast(obj){
	var childs=getChilds(obj);
	return getChilds(obj)[getChilds(obj).length-1];
}

// 获取指定节点的方法
function getIndex(obj,index){
	var childs=getChilds(obj);
	return childs[index];
}

// 获取指定节点的下一个节点
function getNext(obj){
	var next=obj.nextSibling;
	if(!next){
		return false;
	}
	while(next.nodeType==8||(next.nodeType==3&&trim(next.nodeValue)=="")){
		next=next.nextSibling;
		if(!next){
			return false;
		}
	}
	return next;
}

// 获取指定节点的上一个节点
function getUp(obj){
	var up=obj.previousSibling;
	if(!up){
		return false;
	}
	while(up.nodeType==8||(up.nodeType==3&&trim(up.nodeValue)=="")){
		up=up.previousSibling;
		if(!up){
			return false;
		}
	}
	return up;
}

// 将节点插入到指定节点之前  这样就无需传父节点，函数内部已经通过之前的对象获取到父节点了
function insertBefore(obj1,obj2){
	var parent=obj2.parentNode;
	return parent.insertBefore(obj1,obj2);
}

// 将节点插入到指定节点之后
function insertAfter(obj,endobj){
	var parent=endobj.parentNode;
	var next=getNext(endobj);
	// parent.insertBefore(obj1,next);
	if(next){
		return insertBefore(obj,next);
	}
	else{
		return parent.appendChild(obj);
	}
}

// 同一事件绑定多个处理程序的兼容性问题以及this的指向问题
function on(obj,ev,callback){
	if(obj.addEventListener){
		obj.addEventListener(ev,callback);
	}
	else{
		obj.attachEvent('on'+ev,obj.fffnnn);
		obj.fffnnn=function(){
			callback.call(obj);
		}
	}
}

// 删除对象的某一处理程序
function off(obj,ev,callback){
	if(obj.removeEventListener){
		obj.removeEventListener(ev,callback);
	}
	else{
		obj.detachEvent('on'+ev,obj.fffnnn);
	}
}

// 鼠标滚动事件
// 谷歌和IE里面向上120；向下-120; 
// 火狐:向下3; 向上-3;


function mouseWheel(obj,down,up){
	if(obj.attachEvent){
		obj.attachEvent("onmouseWheel",scrollFun);
	}else{
		obj.addEventListener("onmouseWheel",scroll,false);
		obj.addEventListener("mouseWheel",scroll,false);

	}
	function scrollFun(e){
		var e=e||window.event;
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.preventValue=false;
		}
		//去除浏览器的默认动作 ；通知浏览器不要执行与事件关联的默认动作。
		var nub=e.wheelDelta||e.detail;
		if(nub==120||nub==-3){
			//改变this指针，让this指向obj;
			up.call(obj);
		}else if(nub==-120||nub==3){
			down.call(obj);
		}
	}
}

//15.hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
	if(parent.contains){
		return parent.contains(child) && parent!=child;
	}else{
		return (parent.compareDocumentPosition(child)===20);
	}
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
	if(getEvent(e).type=="mouseover"){
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	}else{
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
	}
}
//鼠标移入移出事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
	if(overfun){
		obj.onmouseover=function  (e) {
			if(checkHover(e,obj)){
				overfun.call(obj,[e]);
			}
		}
	}
	if(outfun){
		obj.onmouseout=function  (e) {
			if(checkHover(e,obj)){
				outfun.call(obj,[e]);
			}
		}
	}
}
function getEvent (e) {
	return e||window.event;
}
