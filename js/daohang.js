    //登录
    var denglu=$(".denglu")[0];
    var dl=$(".dl")[0];
    var tba=$(".tba")[0];
    hover(denglu,function(){
        dl.style.backgroundColor="#fff";
        tba.style.display="block";
        $("a",this)[0].style.color="#25b2fe";
        dl.style.backgroundImage="url(./images/t3-2.png)";
    },function(){
        tba.style.display="none";
        dl.style.backgroundColor="#f6f6f6";
        $("a",this)[0].style.color="#e30077";
        dl.style.backgroundImage="url(./images/t3-1.png)";
    });

    //手机营业厅
    var sjyyt=$(".sjyyt")[0];
    var yytbar=$(".yytbar")[0];
    var td=$(".td")[0];
    hover(sjyyt,function(){
        td.style.backgroundColor="#fff";
        yytbar.style.display="block";
        $("a",this)[0].style.color="#25b2fe";
        td.style.backgroundImage="url(./images/t1-2.png)";
    },function(){
        td.style.backgroundColor="#f6f6f6";
        yytbar.style.display="none";
        $("a",this)[0].style.color="#666";
        td.style.backgroundImage="url(./images/t1-1.png)";
    });

    //logo栏城市切换
    var ty=$(".ty")[0];
    var topcity=$(".topcity")[0];
    var d_city=$(".d_city")[0];
    var a_city=$("a",d_city);
    var d_dishi=$(".d_dishi")[0];
    var a_dishi=$("a",d_dishi);
    // var a_city=$(".a_city")[0];
    var flag=true;
    ty.onclick=function(){
        if(flag){
            flag=false;
            d_dishi.style.display="block";
        }else{
            flag=true; 
            d_dishi.style.display="none";
        }
    }
    for(var i=0; i<a_dishi.length; i++){
        a_dishi[i].index=i;
        a_dishi[i].onclick=function(){
            if(this.index==0){
                d_city.style.display="block";
                d_dishi.style.display="none";
                return;
            }
            getContent(topcity,getContent(this));
            d_dishi.style.display="none";
            flag=true;
        }
    }
    for(var i=0; i<a_city.length; i++){
        a_city[i].index=i;
        a_city[i].onclick=function(){
            if(getContent(a_city[this.index]).slice(0,-2)=="北京"||
            getContent(a_city[this.index]).slice(0,-2)=="上海"||
            getContent(a_city[this.index]).slice(0,-2)=="重庆"||
            getContent(a_city[this.index]).slice(0,-2)=="天津"){
                d_city.style.display="none";
            getContent(topcity,getContent(a_city[this.index]).slice(0,-2));
                flag=true;
                return;
            }
            d_city.style.display="none";
            d_dishi.style.display="block";
            flag=true;
        }
    }
    
    //上导航切换
    var item=document.getElementsByClassName("item");
    var list=document.getElementsByClassName("list");
    // var a=$(".a");
    // console.log(a);
    //将i保存下来
   /* for(var i=0; i<item.length; i++){
        item[i].index=i;
        item[i].onmouseover=function(){
            list[this.index].style.display="block";
        }
        item[i].onmouseout=function(){
            list[this.index].style.display="none";
        }
    }
    */
    /*自调用，闭包形式*/
    for(var i=0; i<item.length; i++){
        (function(n){
            item[n].onmouseover=function(){
                // a.style.background="#e4e4e4";
                item[n].style.background="#f7f7f7";
                list[n].style.display="block";
            }
            item[n].onmouseout=function(){
                // a.style.background="";
                list[n].style.display="none";
                item[n].style.background="#e4e4e4";
            }
        })(i)
    }


//公告
    // var g_index=$("#g_index");
    // var gg_list=$(".gg_list")[0];
    // var p_div=$(".p_div");
    // var a_div=$(".a_div");
    // g_index[0].style.display="block";
    // console.log(g_index);
    // for(var i=0; i<a_div.length; i++){
    //     a_div[i].index=i;
    //     a_div[i].onclick=function(){
    //         for(var j=0; j<a_div.length; j++){
    //             g_index[j].style.display="none";
    //         }
    //         g_index[this.index].style.display="block";
    //     }
       
    // }
//客服
    var n3=$(".n3")[0];
    var n4=$(".n4")[0];
    var n5=$(".n5")[0];
    n3.onmouseover=function(){
        animate(n3,{right:32});
    }
    n3.onmouseout=function(){
        animate(n3,{right:-25});
    }
    n4.onmouseover=function(){
        animate(n4,{right:32});
    }
    n4.onmouseout=function(){
        animate(n4,{right:-25});
    }
    n5.onmouseover=function(){
        animate(n5,{right:32});
    }
    n5.onmouseout=function(){
        animate(n5,{right:-25});
    }