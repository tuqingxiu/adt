var mySwiper;
$(function() {

    var allSwiperCount = 6;//swiper总个数
    var preTranslateValue = -1;
	var translateFlag = false;
	var index=0;
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
		$('.current-info').fadeIn(1000);
	},function(){
		$('.current-info').fadeOut();
	})
}

function jump(n) {
	mySwiper.slideTo(n,1000,false);
}
