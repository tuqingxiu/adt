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
    animateMap();
})
//发展历程
function initSwiper1(){
    //初始化swiper
    var slideSwiper = new Swiper('#swiper1', {
		direction: 'vertical',
        // loop: true,
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
//关于我们-地图动画
function animateMap() {
	var $page = $(window);
	var itemOffsetTop = $('.china-map').offset().top;
	var itemOuterHeight = $('.china-map').outerHeight();
	var winHeight = $page.height();
	window.mapNum = 1;
	//初始化一遍
	//china-map处于可见区域
	var winScrollTop = $page.scrollTop();
	if(!(winScrollTop > itemOffsetTop+itemOuterHeight) && !(winScrollTop < itemOffsetTop-winHeight)) {
		if(!window.mapTimer1){
            // var currentRegion = $('.china-map .region-list[data-num='+window.mapNum+']');
            // showBigImg(currentRegion);
            showBigImg();
            window.mapNum++;
			window.mapTimer1 = setInterval(function(){
				if(window.mapNum>11){
                    clearInterval(window.mapTimer1);
                    return;
				}
                var currentRegion = $('.china-map .region-list[data-num='+window.mapNum+']');
                showBigImg(currentRegion);
				window.mapNum++;
			},3000);
		}
	}
	
	$page.scroll(function () {
		//china-map处于可见区域
		var winScrollTop = $page.scrollTop();
		if(!(winScrollTop > itemOffsetTop+itemOuterHeight) && !(winScrollTop < itemOffsetTop-winHeight)) {
			if(!window.mapTimer1){
                showBigImg();
                window.mapNum++;
				window.mapTimer1 = setInterval(function(){
					if(window.mapNum>11){
						clearInterval(window.mapTimer1);
					}
					var currentRegion = $('.china-map .region-list[data-num='+window.mapNum+']');
                    showBigImg(currentRegion);
					window.mapNum++;
				},3000);
			}
		}
	})
}
//动态显示图片,el不存在则默认弹出重庆
function showBigImg(param){
	var el = param;
	if(!el){
		if($('.current-info').css("visibility") == "visible") return;
		el = $('.china-map .region-list[data-num=1]');
	}
	// var type = el.parents('.region-list').attr('data-type');
    // var img = el.parents('.region-list').attr('data-img');
    var type = el.attr('data-type');
    var img = el.attr('data-img');
	//如果图片相等则不开始动画
	if(param && (img == $('.current-img').attr('src'))){
		return;
	}
	//如果上个动画还未结束则不开始动画
	if(window.bigImgState){
		return;
	}
	//动画开始标识
	window.bigImgState = true;

	var targetLocation = $('.current-info').position();//目标位置
	var targetW = $('.current-img').width();//目标宽
	var targetH = $('.current-img').height();//目标高
	var currentLocation = el.offset();
	//最新图片的初始位置
	// $('.new-img').css({
	// 	left: currentLocation.left,
	// 	top: currentLocation.top
    // })
    $('.new-img').offset(currentLocation);
	$('.new-img').attr('src',img);
	$('.new-img').animate({
		left: targetLocation.left,
		top: targetLocation.top,
		width: targetW,
		height: targetH
	  },2000,function(){
		$('.current-info .current-img').attr('src',img);
		$('.current-info .current-text').text(type);
		if($('.current-info').css("visibility") == "hidden"){
			$('.current-info').css('visibility','visible');
		}
		$('.new-img').css({
			width: 0,
			height: 0
		})
		window.bigImgState = false;
	  });
}