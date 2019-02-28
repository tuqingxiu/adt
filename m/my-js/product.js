$(function() {
    //回到顶部
	goTop();
	
    setHeaderShow();
    $(window).on('scroll', function() {
		setHeaderShow();
	});
    goDesignatedLocation();
})