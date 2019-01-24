(function($) {
    function loadHeader(){
        var isEn = location.pathname.indexOf('-en.html')>=0;//英文版
        if(isEn){
            $("#headerBox").load("common/header-en.html",function(){
                var current = $(this).attr('data-type');
                $('header').find('[data-type='+current+']').addClass('current');
                //监听语言切换
                $('.language[type]').click(function(){
                    var type = $(this).attr('type');
                    if(type == 'ch'){//中文
                        var href = location.href.replace('-en.html','.html');
                        location.href = href;
                    }
                })
            });
            $("#footerBox").load("common/footer-en.html");
        }else{
            $("#headerBox").load("common/header.html",function(){
                var current = $(this).attr('data-type');
                $('header').find('[data-type='+current+']').addClass('current');
                //监听语言切换
                $('.language[type]').click(function(){
                    var type = $(this).attr('type');
                    if(type == 'en'){//英文
                        var href = location.href.replace('.html','-en.html');
                        location.href = href;
                    }
                })
            });
            $("#footerBox").load("common/footer.html");
        }
    }
    $(window).on('load', function() {
        loadHeader();
        
	});	
})(window.jQuery);