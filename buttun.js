var BackToTop = {
        	init:function (position) {
        	var showDistance = 1;
            if (document.getElementById("goToTop") == null) {
                var goToTopButton = "<div id='goToTop'><a id='topLink' href='javascript:goto();'></a></div>";
                document.write(goToTopButton);
             };
	
        	if(window.scrollY < showDistance) {
        	    document.getElementById("goToTop").style.visibility = "hidden";
        	}
      	
	visible=false;
        	window.onscroll = function() {
                 document.getElementById("goToTop").style.top = null;
                 document.getElementById("goToTop").style.bottom = null;
                 document.getElementById("goToTop").style.left = null;
                 document.getElementById("goToTop").style.right = null;
        	    if (position.x && position.y) {
        			document.getElementById("goToTop").style.top = position.y>0?position.y:0;
        			document.getElementById("goToTop").style.left = position.x>0?position.x:0;
        		}
        		else if (position.LeftUp) {
        			document.getElementById("goToTop").style.top = "7%";
                                       document.getElementById("goToTop").style.left = "7%";
        		}
        		else if (position.RightUp) {
        			document.getElementById("goToTop").style.top = "7%";
        			document.getElementById("goToTop").style.right = "7%";
        		}
        		else if (position.RightDown) {
        			document.getElementById("goToTop").style.bottom = "7%";
        			document.getElementById("goToTop").style.right = "7%";
        		}
        		else if (position.LeftDown) {
        			document.getElementById("goToTop").style.bottom = "7%";
        			document.getElementById("goToTop").style.left = "7%";
        		}
                else {
                    document.getElementById("goToTop").style.bottom = "7%";
                    document.getElementById("goToTop").style.right = "7%";
                };
        	    if(window.scrollY < showDistance && visible ) {//当window的垂直滚动条距顶部距离小于showDistance设置的值 时
        	        document.getElementById("goToTop").style.visibility = "hidden";
        	        visible = false;
        	    } 
                else if (window.scrollY >= showDistance && !visible ){
        	        document.getElementById("goToTop").style.visibility = "visible";
        	        visible = true;
        	    }
        	};
        	 //给go to top按钮绑定一个click事件      
        	document.getElementById("topLink").onclick = function(){
        	   	var id = setInterval(function () {
        	   		if (window.scrollY == 0) { clearInterval(id);}
        	   		else {window.scrollBy(0,-10)};
        	   	}, 10);
        	};
        	
        }
};
BackToTop.init({RightDown:true});
document.addEventListener("keydown", keydownHandler);
function keydownHandler (e) {
	if (e.shiftKey==true && e.which==38) {
		document.getElementById("topLink").onclick();
	}
};
var Back = BackToTop.init;
var Modal = {
    init: function(attribute) {
        var ElasticDiv     = document.getElementById("ElasticDiv");
        var ElacticContent = document.getElementById('ElasticContent');
        ElasticDiv.style.display = "block";
        //以下部分要将弹出层居中显示
        ElasticDiv.style.left=(document.documentElement.clientWidth-ElasticDiv.clientWidth)/2+document.documentElement.scrollLeft+"px";
        ElasticDiv.style.top =(document.documentElement.clientHeight-ElasticDiv.clientHeight)/2+document.documentElement.scrollTop-0+"px";
        
        //以下部分使整个页面至灰不可点击
        var procbg = document.createElement("div");
        procbg.setAttribute("id","mybg"); 
        procbg.style.background = "#000000";
        procbg.style.width = "100%";
        procbg.style.height = "100%";
        procbg.style.position = "fixed";
        procbg.style.top = "0";
        procbg.style.left = "0";
        procbg.style.zIndex = "500";
        procbg.style.opacity = "0.6";
        procbg.style.filter = "Alpha(opacity=70)";
        //背景层加入页面
        document.body.appendChild(procbg);
        document.body.style.overflow = "hidden"; //取消滚动条
        console.log(attribute.Content);
        if (attribute.Content) {
            ElacticContent.innerText = attribute.Content;   
        };
        if (("draggable" in attribute) && !attribute.draggable) {
            ElacticContent.onmousedown = function  (){};
        }
        else {
            var posX;
            var posY;
            ElacticContent.onmousedown=function(e)
            {
                if(!e) e = window.event; //IE
                posX = e.clientX - parseInt(ElasticDiv.style.left);
                posY = e.clientY - parseInt(ElasticDiv.style.top);
                document.onmousemove = mousemove;
            }
            document.onmouseup = function()
            {
                document.onmousemove = null;
            }
            function mousemove(ev)
            {
                if(ev==null) ev = window.event;//IE
                ElasticDiv.style.left = (ev.clientX - posX) + "px";
                ElasticDiv.style.top = (ev.clientY - posY) + "px";
            }
        };
        if (attribute.closeKey) {
            document.addEventListener("keydown",
            function (e) {
                if (e.which==attribute.closeKey) {
                    console.log('close');
                    closeElasticDiv();
                }
            });
        };
    }
}
var Show = Modal.init;
function closeElasticDiv() //关闭弹出层
{
    var ElasticDiv=document.getElementById("ElasticDiv");
    ElasticDiv.style.display="none";
    document.body.style.overflow = "auto"; //恢复页面滚动条
    var body = document.getElementsByTagName("body");
    var mybg = document.getElementById("mybg");
    body[0].removeChild(mybg);
}
//Modal.init({content:"啊啊啊啊啊啊啊啊",closeKey:38});
