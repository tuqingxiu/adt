var mySwiper;
$(function() {
    //第一个swiper
    var slideSwiper = new Swiper('#first-slide-swiper', {
		loop: true,
		speed: 800,
		autoplay : 3000
		// pagination: '#slide-swiper',
		// paginationClickable: true
	});
    var allSwiperCount = 8;//swiper总个数
    var preTranslateValue = -1;
	var translateFlag = false;
	//跳转到第几个slider
	var item = getUrlParam('item');
	var index=item?(item-1):0;

    if(localStorage.getItem("index")){
        index=localStorage.getItem("index");
        localStorage.removeItem("index"); 
    }
    //初始化第一个slide的动画
    $('.slide1 .animated[data-my-animate]').each(function(){
        var aniName = $(this).attr('data-my-animate');
        $(this).addClass(aniName);
    })
	mySwiper = new Swiper('#index-swiper', {
		direction: 'vertical',
		speed: 600,
		initialSlide: index,//设定初始化时slide的索引
		pagination: '#page',
		paginationClickable: true,
		mousewheelControl: true,
        keyboardControl : true,
		onScroll: function(swiper) {
			if(swiper.activeIndex == allSwiperCount && preTranslateValue == -1) {
				preTranslateValue = mySwiper.height - $(".all-footer").outerHeight() + mySwiper.translate;
			}
			if(swiper.activeIndex == allSwiperCount && translateFlag == false) {
				translateFlag = true;
				swiper.setWrapperTranslate(preTranslateValue);
				mySwiper.lockSwipeToNext()
			}
			if(swiper.activeIndex != allSwiperCount) {
				mySwiper.unlockSwipes()
				translateFlag = false;
			}
		},
		onKeyPress: function(swiper){
			setHeaderShow(swiper.activeIndex);

			if(swiper.activeIndex == allSwiperCount && preTranslateValue == -1) {
				preTranslateValue = mySwiper.height - $(".all-footer").outerHeight() + mySwiper.translate;
			}
			if(swiper.activeIndex == allSwiperCount && translateFlag == false) {
				translateFlag = true;
				swiper.setWrapperTranslate(preTranslateValue);
				mySwiper.lockSwipeToNext()
			}
			if(swiper.activeIndex != allSwiperCount) {
				mySwiper.unlockSwipes()
				translateFlag = false;
			}
		},
		onSlideChangeStart: function(swiper) {
            //加载动画样式
			var num = swiper.activeIndex + 1;
            var activeSlideName = '.slide'+num;
            $(activeSlideName+' .animated[data-my-animate]').each(function(){
                var aniName = $(this).attr('data-my-animate');
                $(this).addClass(aniName);
            })
        },
		onSlideChangeEnd: function(swiper) {
			setHeaderShow(swiper.activeIndex);
            // //加载动画样式
			var num = swiper.activeIndex + 1;
            if(num == 5){
                $('slide5 .animated[data-my-animate]').each(function(){
                    var aniName = $(this).attr('data-my-animate');
                    $(this).addClass(aniName);
                })
                zoombig();
                setTimeout(function(){
                    zoomin();
                },1000);
            }
		}
    });
    //-----------每屏动画效果----------
    //第3屏效果
    animateSlide3();
    //地图动画
    zoomMap();
    //第6屏效果
    animateSlide6();
})
//第3屏效果
function animateSlide3() {
    $('.slide3 .point').hover(function(){
        $(this).find('.point-text').fadeIn(1000);
    },function(){
        $(this).find('.point-text').fadeOut(1000);
    })
}
//地图动画
function zoomMap(){
    $('.china-map').hover(function(){
        zoombig()
    },function(){
        zoomin();
    })
}
function zoombig() {
	$('.global-map').addClass('scale-g');
	$('.china-map').addClass('scale-c');
	$('.thailand').addClass('scale-t');
}

function zoomin() {
	$('.global-map').removeClass('scale-g');
	$('.china-map').removeClass('scale-c');
	$('.thailand').removeClass('scale-t');
}
//第6屏效果
function animateSlide6(){
    $('.slide6 .img-box').hover(function(){
        $(this).find('.content-box').fadeOut();
    },function(){
        $(this).find('.content-box').fadeIn();
    })
}

function jump(n) {
	mySwiper.slideTo(n,1000,false);
}

  //数字动画
var countNumber = function() {
	var countNumberId = $('.mytimer');
	countNumberId.each(count);
	scrollTrue = false;
}

function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}

//设置第一屏时显示header,其它屏幕不显示
function setHeaderShow(index){
	currentIndex = index;
	if(index == 0){
		$('.main-header').fadeIn();
	}else{
		$('.main-header').fadeOut();
	}

	$('.null-header').hover(function(){
		$('.main-header').fadeIn();
	})
	$('.main-header').mouseleave(function(){
		if(currentIndex !== 0){
			$('.main-header').fadeOut();
		}
	})
}