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