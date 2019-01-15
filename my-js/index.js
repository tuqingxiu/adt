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
    
    var preTranslateValue = -1;
	var translateFlag = false;
	var index=0;
    if(localStorage.getItem("index")){
        index=localStorage.getItem("index");
        localStorage.removeItem("index"); 
    }
	mySwiper = new Swiper('#index-swiper', {
		direction: 'vertical',
		speed: 600,
		initialSlide: index,//设定初始化时slide的索引
		pagination: '#page',
		paginationClickable: true,
		mousewheelControl: true,
		keyboardControl : true,
		onScroll: function(swiper) {
			if(swiper.activeIndex == 7 && preTranslateValue == -1) {
				preTranslateValue = mySwiper.height - $(".all-footer").outerHeight() + mySwiper.translate;
			}
			if(swiper.activeIndex == 7 && translateFlag == false) {
				translateFlag = true;
				swiper.setWrapperTranslate(preTranslateValue);
				mySwiper.lockSwipeToNext()
			}
			if(swiper.activeIndex != 7) {
				mySwiper.unlockSwipes()
				translateFlag = false;
			}
		},
		onKeyPress: function(swiper){
			if(swiper.activeIndex == 7 && preTranslateValue == -1) {
				preTranslateValue = mySwiper.height - $(".all-footer").outerHeight() + mySwiper.translate;
			}
			if(swiper.activeIndex == 7 && translateFlag == false) {
				translateFlag = true;
				swiper.setWrapperTranslate(preTranslateValue);
				mySwiper.lockSwipeToNext()
			}
			if(swiper.activeIndex != 7) {
				mySwiper.unlockSwipes()
				translateFlag = false;
			}
		},
		onSlideChangeStart: function(swiper) {
			var topbar = $('#topbar'),
				nav_menu = $('#nav_menu'),
				pagiBullet = $('#page .swiper-pagination-bullet'),
				num = swiper.activeIndex + 1;

			if(num != 1) {
				topbar.slideUp();
				nav_menu.addClass('nav_menu-change');
				$('#menu li').addClass('black');
				$('#menu li.active').removeClass('active-b');
				$('#bs').removeClass('bs-border');
				$('.logo-blue').show();
				$('.logo-white').hide();
				$('.mobile-header').addClass('bgfff')
			} else {
				topbar.slideDown();
				nav_menu.removeClass('nav_menu-change')
				$('#menu li').removeClass('black');
				$('#menu li.active').addClass('active-b');
				$('#bs').addClass('bs-border');
				$('.logo-blue').hide();
				$('.logo-white').show();
				$('.mobile-header').removeClass('bgfff')
			}
		
			if(num == 5) {
				$('.seven').addClass('fadeInUp-seven');
			}
			(num == 8) ? $('#page').css('opacity',0): $('#page').css('opacity',1);
		},

		onSlideChangeEnd: function(swiper) {
			var num = swiper.activeIndex + 1;
			if(num == 2) {
				$('.dec-ch').addClass('fadeInUp-created-title');
			}
			if(num == 3) {
				$('.created-title,.seat-title').addClass('fadeInUp-created-title');
			}
			if(num == 4 && scrollTrue) {
				$('.global').addClass('global-fadedown');
				$('.global-map').addClass('scale-g');
				$('.china-map').addClass('scale-c');
				$('.thailand').addClass('scale-t');

				// countNumber();
				scrollTrue = false;
			}
			if(num == 6) {
				$('.cultrue-subtitle').addClass('fadeInUp-created-title');
				$('.name').addClass('fadeInUp-created-title');
				$('.social-name').addClass('fadeInUp-created-title');
			}
			if(num == 7) {
				$('.dream-title-ch').addClass('fadeInUp-created-title');
			}
		}
    });
    
})

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
function jump(n) {
	mySwiper.slideTo(n,1000,false);
}

var scrollTrue = true;
function addClass(ele,className,n){
	 var winH=$(window).height();//可视窗口的高度
	 var top=$(window).scrollTop();//可视窗口的滚动高度
	 var ele_t=$(ele).offset().top;//内容区的top
	if(ele=='#global'){
	 	if((top>ele_t-winH*0.2)&&(top<ele_t)){
			 $('.global').addClass('global-fadedown');
		 	 $('.global-map').addClass('scale-g');
			 $('.china-map').addClass('scale-c');
			 $('.thailand').addClass('scale-t');
				 if(scrollTrue) {countNumber(); scrollTrue = false;}
		}
		 	
	 }else if(ele=='#m-tit05'){
	 	if((top>ele_t-winH*0.3)&&(top<ele_t)){
			$(ele).addClass(className);
		 	if(scrollTrue) {countNumber();}
		}
		 	
	 }
	else if((top>ele_t-winH*n)&&(top<ele_t)){
		 $(ele).addClass(className);
	 }
 }  