$(function() {
    setHeaderShow();
    $(window).on('scroll', function() {
		setHeaderShow();
	});
	goDesignatedLocation();
	initSwiper1();
    initSwiper2();
})
//发展历程
function initSwiper1(){
    //初始化swiper
    var slideSwiper = new Swiper('#swiper1', {
		direction: 'vertical',
        loop: true,
		speed: 800,
		autoplay :1000,
		slidesPerView: 5,
		// slidesPerView: "auto"
    });
}
//工作伙伴
function initSwiper2(){
    //初始化swiper
    var slideSwiper = new Swiper('#swiper2', {
        loop: true,
		speed: 800,
		autoplay : 3000
        // slidesPerView: 1.1,
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
		if($(window).scrollTop() >= 200){
			$('.main-header').fadeOut();
		}
	})
}