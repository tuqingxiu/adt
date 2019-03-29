$(function() {
    //回到顶部
	goTop();
	
    setHeaderShow();
    $(window).on('scroll', function() {
		setHeaderShow();
	});
	goDesignatedLocation();
	animateMap();
	//初始化swiper
	initSwiper1();
	initSwiper2();
})
function initSwiper1(){
	//初始化swiper
    var slideSwiper = new Swiper('#swiper1', {
		loop: true,
		speed: 800,
		// autoplay:3000
	});
}
function initSwiper2(){
	//初始化swiper
    var slideSwiper = new Swiper('#swiper2', {
		loop: true,
		speed: 800,
		autoplay:3000
	});
}

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