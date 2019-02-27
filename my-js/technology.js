var mySwiper;
$(function() {

    var allSwiperCount = 7;//swiper总个数
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
            // var num = swiper.activeIndex + 1;
            // if(num != 5){
            //     $('.big-img-box').hide();
            // }
		}
	});
	//回到顶部
	goTop();
    //-----------每屏动画效果----------
    //第2屏效果
    animateSlide2();
    //第5屏效果
	animateSlide5();
	//第6屏效果
	animateSlide6();
	//初始化第四屏左右滚动
	initSlide4();
})

function animateSlide2(){
    $('.slide2 .right-box .item-box').hover(function(){
		$(this).find('.content-box').fadeIn();
	},function(){
		$(this).find('.content-box').fadeOut();
	})
}
function animateSlide5(){
    $('.big-img-box').hover(function(event){
        $('.big-img-box').show();
	},function(event){
        $('.big-img-box').hide();
	})
	//显示大图
	$('.slide4 .content2 .item-box[data-bigImg]').hover(function(){
		var current = $(this).attr('data-bigImg');
		var currentSrc = 'images/technology/'+current;
        $('.big-img-box .big-img').attr('src',currentSrc);
        $('.big-img-box').fadeIn(1000);
	})
	$('.slide4 .content2').mouseleave(function(){
        $('.big-img-box').hide();
    })
}
function animateSlide6(){
	$('.slide5 .item-box').hover(function(){
		$(this).find('.content-box').fadeIn();
	},function(){
		$(this).find('.content-box').fadeOut();
	})
}
function initSlide4(){
	// var h1 = $('.tech-slider-carousel .tech-slide-img').height();
	// console.log('imgh========'+h1);
	// if(h1<=0){
    //     if(window.technologyTimer){
    //         clearTimeout(window.technologyTimer);
    //     }
    //     window.technologyTimer = setTimeout(function(){
    //         initSlide4();
    //     },500)
    // }else{
    //     if(window.technologyTimer){
    //         clearTimeout(window.technologyTimer);
    //     }
    //     initTechCarousel();
	// }
	initTechCarousel();
}

function initTechCarousel(){
	if ($('.tech-slider-carousel').length) {
		$('.tech-slider-carousel').owlCarousel({
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
			loop:true,
			margin:0,
			nav:true,
			autoHeight: true,
			smartSpeed: 500,
			// autoplay: 6000,
			URLhashListener:true,
			startPosition: 'URLHash',
			navText: [ '<span class="flaticon-left-arrow"></span>', '<span class="flaticon-right-arrow"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});    		
	}
	//监听hash
	var hash = location.hash;
	if(hash && $(".nav-url a[href='"+hash+"']").length){
		$(".nav-url a.active").removeClass("active");
		$(".nav-url a[href='"+hash+"']").addClass("active");
	}
	window.onhashchange = function(){
		var currentHash = location.hash;
		$(".nav-url a.active").removeClass("active");
		$(".nav-url a[href='"+currentHash+"']").addClass("active");
	}
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