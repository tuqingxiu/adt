$(function() {
    //回到顶部
	goTop();
	
    setHeaderShow();
    $(window).on('scroll', function() {
		setHeaderShow();
	});
    goDesignatedLocation();
    goFile();
})

//跳转到杂志
function goFile(){
    $('.isClick').click(function(){
		var url = $(this).attr('data-url');
		window.open(url,"_system","location=no");
	})
}