(function($) {
    //header.html加载成功
    function headerSuccess(el){
        var current = $(el).attr('data-type');
        $('header').find('[data-type='+current+']').addClass('current');
        //监听语言切换
        toggleLanguage();
        //显示菜单
        $('.main-header .main-menu-btn').click(function(){
            $('#headerBox .main-menu').fadeIn();
        })
        //隐藏菜单
        $('#headerBox .menu-mask').click(function(){
            $('#headerBox .main-menu').fadeOut();
        })
    }
    function footerSuccess(){
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
            $("#footerBox").load("common/footer-en.html",function(){
                footerSuccess();
            });
        }else{
            $("#headerBox").load("common/header.html",function(){
                headerSuccess(this);
            });
            $("#footerBox").load("common/footer.html",function(){
                footerSuccess();
            });
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

    //是否域名访问
    function isDomain(){
        var domain = location.pathname.indexOf('.html')<0;
        if(domain){
            location.href = 'index.html';
        }
    }
    
    $(window).on('load', function() {
        isDomain();
        windowSize();
        loadHeader();
	});	
})(window.jQuery);

//回到顶部
function goTop(){
	$('.go-top').click(function(){
        $('body,html').animate({ scrollTop: 0 }, 800);
		setHeaderShow(0);
	})
}
//设置第一屏时显示header,其它屏幕不显示
function setHeaderShow(index){
	var windowpos = $(window).scrollTop();
	if (windowpos >= 200) {
		$('.main-header').fadeOut();
	} else {
		$('.main-header').fadeIn();
    }
    if(windowpos >= 200){
        var contentW = $('#root').width();
        $('.go-top').css('margin-left',(contentW-60)+'px');
        $('.go-top').fadeIn();
    }else{
        $('.go-top').fadeOut();
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
    }
}