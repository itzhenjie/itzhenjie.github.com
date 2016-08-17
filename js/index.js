// JavaScript Document

//获取对象的位置
function getPos(obj){
	var l = 0;
	var t = 0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {
		left:l,
		top:t	
	};
}
//随机数
function rnd(m,n){
	return parseInt(m+Math.random()*(n-m));
}

function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}
		
//窗墙
function through(obj){
	function a2d(n){
		return 	n*180/Math.PI;
	}
	//判断鼠标从哪个边移入
	function hoverDir(obj,ev){
		var x = obj.offsetLeft+obj.offsetWidth/2 - ev.clientX;
		var y = obj.offsetTop+obj.offsetHeight/2 - ev.clientY;
		return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
	}
	obj.onmouseover = function(ev){
		var oEvent = ev||event;
		var oFrom = oEvent.fromElement||oEvent.relatedTarget;
		if(obj.contains(oFrom)){
			return;
		}
		var dir = hoverDir(obj,oEvent);
		var oS = obj.children[0];
		//左边 2 右侧0 上边3  下边1
		switch(dir){
			case 0:
				oS.style.left = '240px';
				oS.style.top = 0;
			break;
			case 1:
				oS.style.top = '175px';
				oS.style.left = 0;
			break;
			case 2:
				oS.style.left = '-240px';
				oS.style.top = 0;
			break;
			case 3:
				oS.style.top = '-175px';
				oS.style.left = 0;
			break;
		}
		move(oS,{left:0,top:0});
	};
	
	obj.onmouseout = function(ev){
		var oEvent = ev||event;
		var oTo = oEvent.toElement||oEvent.relatedTarget;
		if(obj.contains(oTo)){
			return;
		}
		var dir = hoverDir(obj,oEvent);
		var oS = obj.children[0];
		//左边 2 右侧0 上边3  下边1
		switch(dir){
			case 0:
				move(oS,{left:240,top:0});
			break;
			case 1:
				move(oS,{left:0,top:175});
			break;
			case 2:
				move(oS,{left:-240,top:0});
			break;
			case 3:
				move(oS,{left:0,top:-175});
			break;
		}
	};
}
//nav运动
var iSpeed = 0;
function move2(obj,iTarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		iSpeed+=(iTarget-obj.offsetLeft)/5;
		iSpeed*=0.8;
		obj.style.left = obj.offsetLeft+iSpeed+'px';
		if(Math.round(iSpeed)==0&&obj.offsetLeft==iTarget){
			clearInterval(obj.timer);
		}
	},30);
}
window.onload=function(){
	;(function(){
		var aLi=document.querySelectorAll('nav ul li');
		var oBlock = document.getElementById('block');
		var iNow = 0;
		var oBox2=document.querySelector('.box2');
		var oT=getPos(oBox2).top;
		for(var i=1;i<aLi.length-1;i++){
			aLi[i].onmouseover = function(){
				move2(oBlock,this.offsetLeft);
				this.style.color='white';
			};
			aLi[i].onmouseout = function(){
				move2(oBlock,iNow*aLi[1].offsetWidth+332);
				this.style.color='black';
			};
			;(function(index){				
				aLi[index].onclick = function(){
					iNow = index-1;
					this.style.color='white';
					var start = document.documentElement.scrollTop||document.body.scrollTop;	
					var dis = iNow*800 - start;
					var count = Math.round(2000/30);
					var n = 0;
					clearInterval(document.timer);
					document.timer = setInterval(function(){
						bSys = false;
						n++;
						var a = 1- n/count;
						var cur = start +dis*(1-Math.pow(a,3));
						document.documentElement.scrollTop = document.body.scrollTop = cur;
						if (n == count) {
							clearInterval(document.timer);
						}
					},30);

				};
			})(i);
		}
	})();
//打字效果
	;(function(){
		var arr=['远上寒山石径斜','白云生处有人家','停车坐爱枫林晚','霜叶红于二月花','山行'];
		var aLi=document.querySelectorAll('.left li');
		for(var i=0;i<arr.length;i++){
			for(var j=0;j<arr[0].length;j++){
				var oSpan=document.createElement('span');
				oSpan.innerHTML=arr[i].charAt(j);
				aLi[i].appendChild(oSpan);
			}
		}
		var aSpan=document.querySelectorAll('.left li span');
		//aSpan[aSpan.length-1].style.fontFamily='毛泽东字体';
		var timer=null;
		var i=0;
		clearInterval(timer);
		timer=setInterval(function(){
			move(aSpan[i],{opacity:1}); 
			i++;
			if(i==aSpan.length){
				clearInterval(timer);
			}
		},200);	
	})();
	
	;(function(){
		var oMao=document.querySelector('.box1 .content .left ul .mao img');
		setTimeout(function(){
			move(oMao,{opacity:1});
		},6400);
	})();
	
	//时钟
	;(function(){
		var oClock = document.querySelector('.clock');
		var oHou = document.querySelector('.hou');
		var oMin = document.querySelector('.min');
		var oSec = document.querySelector('.sec');
		var arr=['ⅩⅡ','Ⅰ','Ⅱ','Ⅲ','Ⅳ','Ⅴ','Ⅵ','Ⅶ','Ⅷ','Ⅸ','Ⅹ','ⅩⅠ'];
		for(var i=0;i<60;i++){
			var oS=document.createElement('span');
			oS.style.WebkitTransform='rotate('+i*6+'deg)';
			oS.style.msTransform='rotate('+i*6+'deg)';
			oS.style.transform='rotate('+i*6+'deg)';
			if(i%5==0){
				oS.className='big_scale';
				oS.innerHTML ='<em>'+arr[i/5]+'<\/em>';
				var oEm=oS.children[0];
				oEm.style.WebkitTransform = 'rotate('+-i*6+'deg)';
				oEm.style.msTransform = 'rotate('+-i*6+'deg)';
				oEm.style.transform = 'rotate('+-i*6+'deg)';
			}
			oClock.appendChild(oS);
		}
		function tick(){
			var oDate=new Date();
			var h=oDate.getHours();
			var m=oDate.getMinutes();
			var s=oDate.getSeconds();
			var ms=oDate.getMilliseconds();
			oHou.style.WebkitTransform='rotate('+(h*30+m/60*30)+'deg)';
			oHou.style.msTransform='rotate('+(h*30+m/60*30)+'deg)';
			oHou.style.transform='rotate('+(h*30+m/60*30)+'deg)';
			oMin.style.WebkitTransform='rotate('+(m*6+s/60*6)+'deg)';
			oMin.style.msTransform='rotate('+(m*6+s/60*6)+'deg)';
			oMin.style.transform='rotate('+(m*6+s/60*6)+'deg)';
			oSec.style.WebkitTransform = 'rotate('+(s*6+ms/1000*6)+'deg)';
			oSec.style.msTransform = 'rotate('+(s*6+ms/1000*6)+'deg)';
			oSec.style.transform = 'rotate('+(s*6+ms/1000*6)+'deg)';
		}
		tick();
		setInterval(tick,1);
	})();
	
	
	//第二屏
	var sT = document.documentElement.scrollTop||document.body.scrollTop;
	;(function(){
		var oIntro1=document.querySelector('.intro1');
		var oIntro2=document.querySelector('.intro2');
		var oContent2=document.querySelector('.content2');
		var oBox2=document.querySelector('.box2');
		var oT=getPos(oBox2).top;
		addEvent(window,'scroll',function(){
			sT=document.documentElement.scrollTop||document.body.scrollTop;
			if(sT>=oT){
				oIntro2.style.WebkitTransition = '3s all ease';
				oIntro2.style.msTansition = '3s all ease';
				oIntro2.style.transition = '3s all ease';
				oIntro2.style.WebkitTransform='rotate(700deg)';
				oIntro2.style.msTransform='rotate(700deg)';
				oIntro2.style.transform='rotate(700deg)';
				oIntro2.style.top='120px';
				oIntro2.style.left='630px';
				oIntro2.style.opacity='1';
				
				oIntro1.style.WebkitTransition = '4s all ease';
				oIntro1.style.msTransition = '4s all ease';
				oIntro1.style.transition = '4s all ease';
				oIntro1.style.WebkitTransform='rotate(720deg)';
				oIntro1.style.msTransform='rotate(720deg)';
				oIntro1.style.transform='rotate(720deg)';
				oIntro1.style.top='150px';
				oIntro1.style.left='430px';
				oIntro1.style.opacity='1';
			}
		});
		oContent2.onmouseover=function(){
			oContent2.style.WebkitTransition = '1s all ease';
			oContent2.style.msTransition = '1s all ease';
			oContent2.style.transition = '1s all ease';
			oContent2.style.WebkitTransform='rotateX(-30deg)';
			oContent2.style.msTransform='rotateX(-30deg)';
			oContent2.style.transform='rotateX(-30deg)';
		};
		oContent2.onmouseout=function(){
			oContent2.style.WebkitTransition = '1s all ease';
			oContent2.style.msTransition = '1s all ease';
			oContent2.style.transition = '1s all ease';
			oContent2.style.WebkitTransform='rotateX(0deg)';
			oContent2.style.msTransform='rotateX(0deg)';
			oContent2.style.transform='rotateX(0deg)';
		};
	})();
	
	//第三屏
	;(function(){
		var aDiv=document.querySelectorAll('.box3 .content3 .left3 div');
		var aBtn=document.querySelectorAll('.box3 .content3 .right3 ul li');
		for(var i=0; i<aBtn.length;i++){
			aBtn[i].index=i;
			aBtn[i].onclick=function(){
				for(var i=0; i<aBtn.length;i++){
					aBtn[i].className='';
					aDiv[i].style.display='none';
				}
				this.className='active';
				if(this.innerHTML=='图片坏'){
					//图片环
					var aLi3 = aDiv[3].querySelectorAll('ul li');
					var len = aLi3.length;
					for(var i=0;i<len;i++){
						aLi3[i].style.WebkitTransition = '1s all ease '+((len-i)*100)+'ms';
						aLi3[i].style.msTransition = '1s all ease '+((len-i)*100)+'ms';
						aLi3[i].style.transition = '1s all ease '+((len-i)*100)+'ms';
						aLi3[i].style.WebkitTransform = 'rotateY('+360/len*i+'deg) translateZ(350px)';
						aLi3[i].style.msTransform = 'rotateY('+360/len*i+'deg) translateZ(350px)';
						aLi3[i].style.transform = 'rotateY('+360/len*i+'deg) translateZ(350px)';
					}
				}
				aDiv[this.index].style.display='block';
			};
		}
		//穿墙
		var aLi1=aDiv[0].querySelectorAll('ul li');
		for(var i = 0;i<aLi1.length;i++){
			through(aLi1[i]);
		}
		
		//旋转
		var aLi2=aDiv[1].querySelectorAll('ul li');
		for(var i = 0;i<aLi2.length;i++){
			aLi2[i].onmouseover=function(){
				this.style.transition = '3s all ease';
				this.style.msTransition = '3s all ease';
				this.style.transform='rotate(360deg)';
				this.style.msTransform='rotate(360deg)';
			};
			aLi2[i].onmouseout=function(){
				this.style.transition = '3s all ease';
				this.style.msTransition = '3s all ease';
				this.style.transform='';
				this.style.msTransform='';
				this.style.transform='rotate(0deg)';
				this.style.msTransform='rotate(0deg)';
			};

		}
		
		//3D
		var oSpan=document.querySelector('.front');
		setInterval(function(){
			oSpan.style.color='rgba('+rnd(0,255)+','+rnd(0,255)+','+rnd(0,255)+',1)';
		},300);	
		
		
		
		//翻书
		var oBook = document.querySelector('.book1');
		var oPage = document.querySelector('.page');
		var oPrev = document.querySelector('.prev');
		var oNext = document.querySelector('.next');
		var oPage2 = document.querySelector('.page2');
		var iNow = 0;
		var bOk = false;
		oBook.onclick=function(){
			if(bOk)return;
			bOk = true;
			oPage.style.WebkitTransition = '1s all ease';
			oPage.style.transition = '1s all ease';
			oPage.style.WebkitTransform = 'perspective(800px) rotateY(-180deg)';
			oPage.style.transform = 'perspective(800px) rotateY(-180deg)';
			iNow++;
			function tranEnd(){
				oPage.removeEventListener('transitionend',tranEnd,false);
				oPage.style.WebkitTransition = 'none';
				oPage.style.transition = 'none';
				oBook.style.backgroundImage = 'url(img/movie'+(iNow%3+1)+'.jpg)';
				oPrev.style.backgroundImage = 'url(img/movie'+(iNow%3+1)+'.jpg)';
				oNext.style.backgroundImage = 'url(img/movie'+((iNow+1)%3+1)+'.jpg)';
				oPage2.style.backgroundImage = 'url(img/movie'+((iNow+1)%3+1)+'.jpg)';
				
				oPage.style.WebkitTransform = 'perspective(800px) rotateY(0deg)';
				oPage.style.transform = 'perspective(800px) rotateY(0deg)';
				bOk = false;
			}
			oPage.addEventListener('transitionend',tranEnd,false);
		}
		
		//爆炸
			var oBook2 = document.querySelector('.book2');
			var iNow = 0;
			var R = 4;
			var C = 7;
			var bOk = false;
			for(var i=0;i<R;i++){
				for(var j=0;j<C;j++){
					var oS = document.createElement('span');
					oS.style.width = oBook2.offsetWidth/C+'px';
					oS.style.height = oBook2.offsetHeight/R+'px';
					oBook2.appendChild(oS);
					oS.style.left = j*oS.offsetWidth+'px';
					oS.style.top = i*oS.offsetHeight+'px';
					oS.style.backgroundPosition = '-'+oS.offsetLeft+'px -'+oS.offsetTop+'px';
				}
			}
			var aS = oBook2.children;
			oBook2.onclick=function(){
				if(bOk)return;
				bOk = true;
				iNow++;
				for(var i=0;i<aS.length;i++){
					aS[i].style.WebkitTransition = '.7s all ease';
					aS[i].style.transition = '.7s all ease';
					var x = aS[i].offsetLeft+aS[i].offsetWidth/2-oBook2.offsetWidth/2;
					var y = aS[i].offsetTop+aS[i].offsetHeight/2-oBook2.offsetHeight/2;
					aS[i].style.WebkitTransform = 'perspective(800px) translate('+x+'px,'+y+'px) rotateY('+rnd(-360,360)+'deg) rotateX('+rnd(-360,360)+'deg) scale('+rnd(1,3)+','+rnd(1,3)+')';
					aS[i].style.transform = 'perspective(800px) translate('+x+'px,'+y+'px) rotateY('+rnd(-360,360)+'deg) rotateX('+rnd(-360,360)+'deg) scale('+rnd(1,3)+','+rnd(1,3)+')';
					aS[i].style.opacity = 0;
				}
				
				function tranEnd(){
					aS[aS.length-1].removeEventListener('transitionend',tranEnd,false);
					for(var i=0;i<aS.length;i++){
						aS[i].style.WebkitTransition = 'none';
						aS[i].style.transition = 'none';
						aS[i].style.backgroundImage = 'url(img/movie'+(iNow%3+1)+'.jpg)';
						aS[i].style.WebkitTransform = 'perspective(800px) translate(0,0) rotateY(0deg) rotateX(0deg) scale(1,1)';
						aS[i].style.transform = 'perspective(800px) translate(0,0) rotateY(0deg) rotateX(0deg) scale(1,1)';
						aS[i].style.opacity = 1;
					}
					oBook2.style.backgroundImage = 'url(img/movie'+((iNow+1)%3+1)+'.jpg)';
					bOk = false;
				}
				aS[aS.length-1].addEventListener('transitionend',tranEnd,false);
			};
	})();
	
	//第四屏
	;(function(){
		var speed=50;
		var oDemo=document.getElementById('demo');
		var oDemo1=document.getElementById('demo1');
		var oDemo2=document.getElementById('demo2');
		demo2.innerHTML=demo1.innerHTML;
		function Marquee(){
			if(oDemo2.offsetTop-oDemo.scrollTop<=0)
				{
					oDemo.scrollTop-=oDemo1.offsetHeight;
				}
			else{
				oDemo.scrollTop++;
			}
		}
		Marquee();
		clearInterval(MyMar)
		var MyMar=setInterval(Marquee,speed);
		oDemo.onmouseover=function() {clearInterval(MyMar)};
		oDemo.onmouseout=function() {MyMar=setInterval(Marquee,speed)};	
   })();
	
	//第五屏
	;(function(){
		var oDetal=document.querySelector('.detal');
		var oBox5=document.querySelector('.box5');
		var oT2=getPos(oBox5).top;
		addEvent(window,'scroll',function(){
			sT=document.documentElement.scrollTop||document.body.scrollTop;
			if(sT>=oT2){
				oDetal.style.display='block';
				oDetal.style.WebkitTransition = '.3s all ease';
				oDetal.style.msTransition = '.3s all ease';
				oDetal.style.transition = '.3s all ease';
				setTimeout(function(){
					oDetal.style.opacity = 0.8;
					oDetal.style.WebkitTransform = 'scale(1,1)';
					oDetal.style.msTransform = 'scale(1,1)';
					oDetal.style.transform = 'scale(1,1)';
				},0);
			}
		});
	})();
	
	//返回顶部
	;(function(){
		var oBack=document.querySelector('.back_top');
		
		var timer = null;
		var bSys = false;
		addEvent(window,'scroll',function(){
			if(bSys){
				clearInterval(timer);
			}
			bSys = true;
			var sT = document.documentElement.scrollTop||document.body.scrollTop;	
			if(sT>700){
				oBack.style.display = 'block';
			}else{
				oBack.style.display = 'none';
			}
		});
		oBack.onclick = function(){
			var start = document.documentElement.scrollTop||document.body.scrollTop;	
			var dis = 0 - start;
			var count = Math.round(2000/30);
			var n = 0;
			clearInterval(timer);
			timer = setInterval(function(){
				bSys = false;
				n++;
				var a = 1- n/count;
				var cur = start +dis*(1-Math.pow(a,3));
				document.documentElement.scrollTop = document.body.scrollTop = cur;
				if (n == count) {
					clearInterval(timer);
				}
			},30);
		};
	})();
};