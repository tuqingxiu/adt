$(function() {
    setHeaderShow();
    $(window).on('scroll', function() {
		setHeaderShow();
	});
    goDesignatedLocation();
    animate1();
    animate2();
    animate3();
})

//第三屏遮罩层显示，文化项目
function animate1(){
    $('.section3 .boxs').hover(function(){
        showUp($(this).find('.content-box'));
    },function(){
        hideDown($(this).find('.content-box'));
    })
}
//字体放大
function animate2(){
    $('.animated-text').hover(function(){
        $(this).addClass('scale-text');
    },function(){
        $(this).removeClass('scale-text');
    })
}
//蓝天计划 显示遮罩层
function animate3(){
    $('.section7 .img-content .item-box').hover(function(){
        showUp($(this).find('.content-box'));
        //文字超出时滚动
        var allH = $(this).find('.cont-box').height();
        var contH1 = $(this).find('.cont1').height();
        var contH2 = $(this).find('.cont2').height();
        var marquee = $(this).find('.cont2');

        if(allH<contH1+contH2){
            marquee.attr('scrollamount',5);
            marquee[0].start();
        }
    },function(){
        hideDown($(this).find('.content-box'));
        var marquee = $(this).find('.cont2');
        marquee[0].stop();
    })
}
//显示遮罩层
function showUp(el){
    el.fadeIn().removeClass('fadeOutDown').addClass('fadeInUp');
}
//隐藏遮罩层
function hideDown(el){
    el.removeClass('fadeInUp').addClass('fadeOutDown').fadeOut();
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
        // setTimeout(function(){
        // 	$(window).scrollTop(scroll);
        // },1000)
    }
}


//设置第一屏时显示header,其它屏幕不显示
function setHeaderShow(index){
	var windowpos = $(window).scrollTop();
	if (windowpos >= 200) {
		$('.main-header').fadeOut();
	} else {
		$('.main-header').fadeIn();
	}

    $('.null-header').css('position','fixed');
	$('.null-header').hover(function(){
		$('.main-header').fadeIn();
	})
	$('.main-header').mouseleave(function(){
		if(windowpos >= 200){
			$('.main-header').fadeOut();
		}
	})
}