$(function() {
    //回到顶部
	goTop();
	
    setHeaderShow();
    $(window).on('scroll', function() {
		setHeaderShow();
	});
    goDesignatedLocation();
    initSwiper1();
    initSwiper2();
})
//三个原则切换
function initSwiper1(){
    //初始化swiper
    var slideSwiper = new Swiper('#swiper1', {
        loop: true,
        speed: 800,
        autoplay : 3000
    });
}
//工作体验切换
function initSwiper2(){
    //初始化swiper
    var slideSwiper = new Swiper('#swiper2', {
        loop: true,
        speed: 800,
        slidesPerView: 1.1,
        // autoplay : 3000
    });
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

//回到顶部
function goTop(){
	$('.go-top').click(function(){
        $('body,html').animate({ scrollTop: 0 }, 800);
		setHeaderShow(0);
	})
}
//设置第一屏时显示header,其它屏幕不显示
function setHeaderShow(index){
	var windowpos = $(window).scrollTop();
	if (windowpos >= 200) {
		$('.main-header').fadeOut();
	} else {
		$('.main-header').fadeIn();
    }
    if(windowpos >= 200){
        $('.go-top').fadeIn();
    }else{
        $('.go-top').fadeOut();
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