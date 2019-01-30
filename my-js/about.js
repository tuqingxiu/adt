var mySwiper;
$(function() {

    var allSwiperCount = 6;//swiper总个数
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
			//设置header是否显示
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
			//设置header是否显示
			setHeaderShow(swiper.activeIndex);
			
            // //加载动画样式
			var num = swiper.activeIndex + 1;
            if(num == 5){
                $('slide5 .animated[data-my-animate]').each(function(){
                    var aniName = $(this).attr('data-my-animate');
                    $(this).addClass(aniName);
                })
            }
		}
	});
	//回到顶部
	goTop();
    //-----------每屏动画效果----------
    //第4屏效果
    animateSlide4();
})

function animateSlide4(){
	$('.show-regin').hover(function(){
		var type = $(this).parents('.region-list').attr('data-type');
		var img = $(this).parents('.region-list').attr('data-img');
		$('.current-info .current-img').attr('src',img);
		$('.current-info .current-text').text(type);
		$('.current-info').addClass('fadeInUp');
		// $('.current-info').fadeIn();
	},function(){
		// $('.current-info').fadeOut();
		$('.current-info').removeClass('fadeInUp');
	})
}

function jump(n) {
	mySwiper.slideTo(n,1000,false);
}

function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}

//回到顶部
function goTop(){
	$('.go-top').click(function(){
		jump(0);
		setHeaderShow(0);
	})
}
//设置第一屏时显示header,其它屏幕不显示
function setHeaderShow(index){
	currentIndex = index;
	if(index == 0){
		$('.main-header').fadeIn();
		$('.go-top').fadeOut();
	}else{
		$('.main-header').fadeOut();
		$('.go-top').fadeIn();
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