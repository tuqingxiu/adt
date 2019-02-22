$(function() {
    // setHeaderShow();
    $(window).on('scroll', function() {
		// setHeaderShow();
	});
	goDesignatedLocation();
	animateMap();
})

//首页地图动画
function animateMap() {
	//var $page = $('#root');
	var $page = $(window);
	var itemOffsetTop = $('.china-map').offset().top;
	var itemOuterHeight = $('.china-map').outerHeight();
	var winHeight = $page.height();
	window.mapNum = 1;
	//初始化一遍
	//china-map处于可见区域
	var winScrollTop = $page.scrollTop();
	if(!(winScrollTop > itemOffsetTop+itemOuterHeight) && !(winScrollTop < itemOffsetTop-winHeight)) {
		if(!window.mapTimer){
			window.mapTimer = setInterval(function(){
				if(window.mapNum>11){
					clearInterval(window.mapTimer);
				}
				$('.china-map .region-list[data-num='+window.mapNum+']').fadeIn(600);
				window.mapNum++;
			},600);
		}
	}
	
	$page.scroll(function () {
		//china-map处于可见区域
		var winScrollTop = $page.scrollTop();
		if(!(winScrollTop > itemOffsetTop+itemOuterHeight) && !(winScrollTop < itemOffsetTop-winHeight)) {
			if(!window.mapTimer){
				window.mapTimer = setInterval(function(){
					if(window.mapNum>11){
						clearInterval(window.mapTimer);
					}
					$('.china-map .region-list[data-num='+window.mapNum+']').fadeIn(600);
					window.mapNum++;
				},600);
			}
		}
	})
}

//跳转到指定位置
function getUrlParam(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
//go designated location
function goDesignatedLocation(){
    var item = getUrlParam('item');
    var el = $('[data-item='+item+']');
    if(item && el.length){
        var scroll = el.offset().top;
        $(window).scrollTop(scroll);
    }
}


//设置第一屏时显示header,其它屏幕不显示
function setHeaderShow(index){
	var windowpos = $(window).scrollTop();
	if (windowpos >= 200) {
		$('.main-header').fadeOut();
	} else {
		$('.main-header').fadeIn();
	}

    $('.null-header').css('position','fixed');
	$('.null-header').hover(function(){
		$('.main-header').fadeIn();
	})
	$('.main-header').mouseleave(function(){
		if($(window).scrollTop() >= 200){
			$('.main-header').fadeOut();
		}
	})
}


function isIE() { //ie?
    if (!!window.ActiveXObject || "ActiveXObject" in window)
           { return true; }
    else
           { return false; }
}