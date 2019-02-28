$(function() {
	//回到顶部
	goTop();
	
    setHeaderShow();
    $(window).on('scroll', function() {
		setHeaderShow();
	});
    goDesignatedLocation();

    //初始化swiper
    var slideSwiper = new Swiper('.news-list', {
		// loop: true,
		speed: 800,
		// autoplay : 3000
		// pagination: '#slide-swiper',
		// paginationClickable: true
	});
})