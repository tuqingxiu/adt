$(function() {
    setHeaderShow();
    $(window).on('scroll', function() {
		setHeaderShow();
	});
    goDesignatedLocation();
    animate1();
    animate2();
    animate3();
})
//鼠标放上，显示其它颜色图标
function animate1(){
    $('.section6 .content1 .cont4 .item-box').hover(function(){
        $(this).addClass('active');
    },function(){
        $(this).removeClass('active');
    })
}
//遮罩层
function animate2(){
    $('#college-box .item-box>.content-box').hover(function(){
        $(this).find('.content-box').fadeIn();
    },function(){
        $(this).find('.content-box').fadeOut();
    })
}
//办公环境 遮罩层
function animate3(){
    $('.section8 .slide').hover(function(){
        $(this).find('.cont-box').fadeIn().removeClass('fadeOutDown').addClass('fadeInUp');
    },function(){
        $(this).find('.cont-box').removeClass('fadeInUp').addClass('fadeOutDown').fadeOut();
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
        // setTimeout(function(){
        // 	$(window).scrollTop(scroll);
        // },1000)
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
		if(windowpos >= 200){
			$('.main-header').fadeOut();
		}
	})
}