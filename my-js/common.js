(function($) {
    //header.html加载成功
    function headerSuccess(el){
        var current = $(el).attr('data-type');
        $('header').find('[data-type='+current+']').addClass('current');
        //监听语言切换
        toggleLanguage();
    }
    
    function loadHeader(){
        //根据环境加载对应的中英文header和footer
        var isEn = location.pathname.indexOf('-en.html')>=0;//英文版
        if(isEn){
            $("#headerBox").load("common/header-en.html",function(){
                headerSuccess(this);
            });
            $("#footerBox").load("common/footer-en.html");
        }else{
            $("#headerBox").load("common/header.html",function(){
                headerSuccess(this);
            });
            $("#footerBox").load("common/footer.html");
        }
    }
    //是否域名访问
    function isDomain(){
        var domain = location.pathname.indexOf('.html')<0;
        if(domain){
            location.href = 'index.html';
        }
    }

    //根据屏幕尺寸切换pc端和移动端
    function toggleTerminal(){
        var window_width = $(window).width();//获取浏览器窗口宽度
        var isMobile = location.pathname.indexOf('/m/')>=0; //来源为移动端链接
        var isDomain = location.pathname.indexOf('.html')<0; //来源为域名访问

        if(isDomain){
            location.href = 'index.html';
            return;
        }
        if(window_width > 1024){//pc终端
            if(isMobile){
                var href = location.href.replace('/m/','/');
                location.href = href;
            }
        }else{//移动终端
            if(!isMobile){
                var str = location.pathname.split('.html')[0];//.html前的字符串
                var index = str.lastIndexOf("\/");//最后一个斜杠的位置
                var name = str.substring(index,str.length);//文件夹名称："/index"
                var href = location.href.replace(name,'/m'+name);
                location.href = href;
            }
        }
    }
    //监听窗口变化,//根据屏幕尺寸切换pc端和移动端
    function windowSize(){
        toggleTerminal();
        $(window).resize(function() {
            toggleTerminal();
        })
    }

    //切换语言
    function toggleLanguage(){
        $('.language[type]').click(function(){
            var type = $(this).attr('type');
            if($(this).hasClass('active')){
                return;
            }
            if(type == 'ch'){//中文
                var href = location.href.replace('-en.html','.html');
                location.href = href;
            }else if(type == 'en'){//英文
                var href = location.href.replace('.html','-en.html');
                location.href = href;
            }
        })
    }
    
    $(window).on('load', function() {
        windowSize();
        loadHeader();
	});	
})(window.jQuery);