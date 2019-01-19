(function($) {
    function loadHeader(){
        $("#headerBox").load("common/header.html",function(){
            var current = $(this).attr('data-type');
            $('header').find('[data-type='+current+']').addClass('current');
        });
        $("#footerBox").load("common/footer.html");
        
    }
    $(window).on('load', function() {
        loadHeader();
        
	});	
})(window.jQuery);