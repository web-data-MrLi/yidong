// window.onload=function(){
    // var middle=$(".banner")[0];
    // var imgs=$("a",$(".imgBox")[0]);
    // var lis=$(".hot1");
    // console.log(lis.length);
    // console.log(imgs.length);
    // var btnL=$(".btnL")[0];
    // var btnR=$(".btnR")[0];
    
    // //console.log(imgs);
    // /*页面状态初始化
    // */
    // imgs[0].style.zIndex=10;
    // console.log(imgs);

//     //lis[0].className="hot";
//     lis[0].classList.add("hot");
//     /*now保存当前窗口中显示图片的下标*/
//     /*自动轮播*/
//     var now=0;
//     /*middle 鼠标移入自动轮播停，移除自动进行*/
//         middle.onmouseover=function(){
//             clearInterval(t);
//         }
//         middle.onmouseout=function(){
//             t=setInterval(move,1000);
//         }
//      var t=setInterval(move,1000);
    
//         function move(){
//             now++;
//             if(now==imgs.length){
//                 now=0;
//             }
//          //先让所有图片的层级降低，当前图片层级最高
//             for(var i=0; i<imgs.length; i++){
//                 imgs[i].style.zIndex=5;
//                 //lis[i].style.background="";
//                 lis[i].classList.remove("hot");

//             }
//             imgs[now].style.zIndex=10;
//             lis[now].classList.add("hot");
//             //lis[now].style.background="red";
//         }
        
//         /*选项卡*/
//         for(var i=0; i<lis.length; i++){
//             lis[i].index=i;
//             lis[i].onclick=function(){
//                 for(var i=0; i<imgs.length; i++){
//                     imgs[i].style.zIndex=5;
//                     //lis[i].className="";
//                     lis[i].classList.remove("hot");
//                 }
//                 imgs[this.index].style.zIndex=10;
//                 lis[this.index].classList.add("hot");
//                 //lis[i].className="hot";
//                 now=this.index;
//             }
//         }
//         /*btn*/
//        btnR.onclick=function(){
//             move();
//        }
//        btnL.onclick=function(){
//             movel();
//        }
//        function movel(){
//             now--;
//             if(now<0){
//                 now=imgs.length-1;
//             }
//         //先让所有图片的层级降低，当前图片层级最高
//             for(var i=0; i<imgs.length; i++){
//                 imgs[i].style.zIndex=5;
//                 lis[i].classList.remove("hot");
//                 //lis[i].style.background="";
//             }
//             imgs[now].style.zIndex=10;
//             lis[now].classList.add("hot");
//             //lis[now].style.background="red";
//        }
// // }

    var banner=$("#banner");
    // console.log(banner);
    var banner_img=$(".banner_img")[0];
    //console.log(banner_img);
    var ban_img=$(".ban_img");
    var circle=$(".hot1");
    //console.log(circle);
    var b_left=$(".btnL")[0];
    var b_right=$(".btnR")[0];
    var b_ow=parseInt(getStyle($(".ban_img")[0],"width"));
    //console.log(b_ow);
    var n=0;  //当前的第一张
    var next=0; //即将出现的下一张
    var flag=true;
    //开关作用：解决用户快速点击出现的一些空白区域，当点击运行完一和动画，才让出现下一张;
    var t=setInterval(move,3666);
    function move(){
        if(flag==false){
            return;
        }
        flag=false;
        next=n+1;   //第一张还没开始动时，下一张就做好准备;
        if(next>=ban_img.length){
            next=0;
        }
        ban_img[next].style.left=b_ow+"px";
        animate(ban_img[n],{left:-b_ow},600);
        animate(ban_img[next],{left:0},600,function(){
            flag=true;
        });
        for(var i=0; i<circle.length; i++){
            circle[i].style.background="#a5a5a5";
        }
        circle[next].style.background="#d60055";
        n=next;
    }
    banner_img.onmouseover=function(){
        clearInterval(t);
    }
    banner_img.onmouseout=function(){
        t=setInterval(move,3600);
    }
    b_right.onclick=function(){
        move();
    }
    b_left.onclick=function(){
        moveL();
    }
    function moveL(){
        if(flag==false){
            return;
        }
        flag=false;
        next=n-1;
        if(next<0){
            next=ban_img.length-1;
        }
        ban_img[next].style.left=-b_ow+"px";
        animate(ban_img[n],{left:b_ow},600);
        animate(ban_img[next],{left:0},600,function(){
            flag=true;
        });
        for(var i=0; i<circle.length; i++){
            circle[i].style.background="#e5e5e5";
        }
        circle[next].style.background="#d60055";
        n=next;
    }
    //选项卡
    for(var i=0; i<circle.length; i++){
        circle[i].index=i;
        circle[i].onclick=function(){
            if(this.index>n){
                if(flag==false){
                    return;
                }
                flag=false;
                ban_img[this.index].style.left=b_ow+"px";
                animate(ban_img[n],{left:-b_ow},600);
                animate(ban_img[this.index],{left:0},600,function(){
                    flag=true;
                });
            }else if(this.index<n){
                if(flag=false){
                    return;
                }
                flag=false;
                ban_img[this.index].style.left=-b_ow+"px";
                animate(ban_img[n],{left:b_ow},600);
                animate(ban_img[this.index],{left:0}
                    ,600,function(){
                        flag=true;
                    });
            }else{
                return;
            }
            circle[n].style.background="#a5a5a5";
            circle[this.index].style.background="#d60055";
            n=this.index;
            next=this.index;
        }
    }
