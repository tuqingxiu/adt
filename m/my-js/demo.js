var mySwiper;
$(function() {
	
	var scrollTrue = true;
	var slideSwiper = new Swiper('#first-slide-swiper', {
		loop: true,
		speed: 800,
		autoplay : 3000,
		pagination: '#slide-swiper',
		paginationClickable: true
	});
	var secondSwiper = new Swiper('#second-slide-swiper', {
		speed: 800,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next'
		
	});

	var mobile1 = new Swiper('#first-mobile-swiper', {
		autoplay : 3000,
		loop: true,
		speed: 800,
		pagination: '#first-pagi'
	});
	
	var mobileDecration = new Swiper('#decration-mobile-swiper', {
		speed: 800
	});

	var mobileCulture = new Swiper('#culture-mobile-swiper', {
		speed: 800,
		initialSlide :1,
		spaceBetween: 10,
		slidesPerView: 1
	});
	var mobile2 = new Swiper('#second-mobile-swiper', {
		speed: 800,
		initialSlide :1,
		pagination: '#second-pagi',
		spaceBetween: 10,
		slidesPerView: 1
	});
	
	var cultureSwiper= new Swiper('#six-culture-swiper', {
		speed: 800,
		noSwiping : true
	});

	var eightslideSwiper = new Swiper('#eight-slide-swiper', {
		noSwiping : true
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

				countNumber();
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
	
	 var IsMobile = navigator.userAgent.match(/mobile/i);
    //pc设备   
    if (!IsMobile) {  
        mySwiper.disableTouchControl();
    }  
	
	$('.first-slide-info').addClass('fadeInUp-info');
	//360旋转  座椅	
	var threeSixty;
	threeSixty = $('.product1').ThreeSixty({
		totalFrames: 35,
		endFrame: 35,
		currentFrame: 1,
		imgList: '.threesixty_images1',
		progress: '.spinner1',
		imagePath: 'img/360-2/',
		filePrefix: '',
		ext: '.png',
		height: '100%',
		width: '100%',
		drag: false,
		navigation: true,
		disableSpin: false
	});
	
	var tag = false,
		ox = 0,
		left = 0,
		bgleft = 0;

	
	$(document).on('mousedown', '.progress_btn1', function(e) {
		ox = e.pageX - left;
		tag = true;
		secondSwiper.disableTouchControl();
	})
	$(document).on('mouseup', '.progress_btn1', function(e) {
		tag = false;
		secondSwiper.enableTouchControl();
	})
	$(document).on('mousemove', '.progress-box1', function(e) {
		if(tag) {
			left = e.pageX - ox;
			if(left <= 0) {
				left = 0;
			} else if(left > 274) {
				left = 274;
			}
			$('.progress_btn1').css('left', left);
			var displayValue = parseInt((360 / 274) * left);
			var rangeV = Math.floor(displayValue / 360 * 35);
			threeSixty.gotoAndPlay(rangeV)
			$('.text').html(displayValue + '°');
		}
	})
	
	var threeSixty3;
	threeSixty3 = $('.product3').ThreeSixty({
		totalFrames: 35,
		endFrame: 35,
		currentFrame: 1,
		imgList: '.threesixty_images1',
		progress: '.spinner3',
		imagePath: 'img/360-2/',
		filePrefix: '',
		ext: '.png',
		height: '100%',
		width: '100%',
		drag: false,
		navigation: true,
		disableSpin: false
	});
	var startX = 0,
		leftX = 0,
		eX = 0;

	$('.progress-box3').on('touchmove', function(evt) {
		
		evt.preventDefault();
		evt.stopPropagation();
		leftX = evt.originalEvent.changedTouches[0].pageX - $('.progress-box3').offset().left;
		if(leftX <= 0) {
			leftX = 0;
		} else if(leftX > 274) {
			leftX = 274;
		}
		$('.progress_btn3').css('left', leftX);
		var displayValue = parseInt((360 / 274) * leftX);
		var rangeV = Math.floor(displayValue / 360 * 35);
		threeSixty3.gotoAndPlay(rangeV)
		$('.text3').html(displayValue + '°');
	});

	
	//360旋转  头枕	
	var
		threeSixty2 = $('.product2').ThreeSixty({
			totalFrames: 36,
			endFrame: 36,
			currentFrame: 1,
			imgList: '.threesixty_images2',
			progress: '.spinner2',
			imagePath: 'img/brown/',
			filePrefix: '',
			ext: '.png',
			height: '50%',
			width: '50%',
			drag: false,
			navigation: true,
			disableSpin: false
		});
	//scroll bar
	var tag = false,
		ox = 0,
		left2 = 54.666,
		bgleft = 0;
	$('.progress_btn2').css('left', left2);
	$('.progress_btn2').mousedown(function(e) {
		ox = e.pageX - left2;
		tag = true;
	});
	$(document).mouseup(function() {
		tag = false;
	});
	$('.progress-box2').mousemove(function(e) { //鼠标移动
		if(tag) {
			left2 = e.pageX - ox;
			if(left2 <= 0) {
				left2 = 0;
			} else if(left2 > 226) {
				left2 = 226;
			}
			$('.progress_btn2').css('left', left2);
			var displayValue2 = parseInt((360 / 226) * left2);
			var rangeV = Math.floor(displayValue2 / 360 * 35);
			threeSixty2.gotoAndPlay(rangeV)
			$('.text2').html(displayValue2 + '°');
		}
	});
	
	//手机端 头枕	
	var threeSixty4;
	threeSixty4 = $('.product4').ThreeSixty({
		totalFrames: 36,
			endFrame: 36,
			currentFrame: 1,
			imgList: '.threesixty_images2',
			progress: '.spinner4',
			imagePath: 'img/brown/',
			filePrefix: '',
			ext: '.png',
			height: '50%',
			width: '50%',
			drag: false,
			navigation: true,
			disableSpin: false
	});
	
	var leftX_z = 0;

	$('.progress-box4').on('touchmove', function(evt) {
		
		evt.preventDefault();
		leftX_z = evt.originalEvent.changedTouches[0].pageX - $('.progress-box4').offset().left;
		if(leftX_z <= 0) {
			leftX_z = 0;
		} else if(leftX_z > 150) {
			leftX_z = 150;
		}
		$('.progress_btn4').css('left', leftX_z);
		var displayValue = parseInt((360 / 150) * leftX_z);
		var rangeV = Math.floor(displayValue / 360 * 36);
		threeSixty4.gotoAndPlay(rangeV)
		$('.text4').html(displayValue + '°');
	});

	
	

	$('.left').hover(function() {
		$(this).find('.bg').css('width', '106%');
		$(this).find('.cover').css('opacity', '0');
		$('.created-txt').css('opacity', '1');
		$('.innovate-big-txt').css('opacity', '1');
	}, function() {
		$(this).find('.cover').css('opacity', '1');
		$('.created-txt').css('opacity', '0');
		$('.innovate-big-txt').css('opacity', 0);
	})

	$('.middle').hover(function() {
		$(this).find('.bg').css('width', '100%');
		$('.left .bg').css('width', '70%');
		$(this).find('.cover').css('opacity', '0');
		$('.seat-display').css('opacity', '1');
		$('.seat-info').css('left', '0%');
		$('.innovate-big-txt').css('opacity', 0);
	}, function() {
		$('.left .bg').css('width', '80%');
		$(this).find('.bg').css('width', '80%');
		$(this).find('.cover').css('opacity', '1');
		$('.seat-display').css('opacity', '0');
		$('.seat-info').css('left', '10%');
	})
	
	$('.right').hover(function() {
		$('.middle .bg').css('width', '60%');
		$(this).find('.cover').css('opacity', '0');
		$('.right-seat-display').css('opacity', '1');
		$('.right-seat').css('left', '10%');
		$('.seat-display').css('width', '50px');
	}, function() {
		$('.middle .bg').css('width', '80%');
		$(this).find('.cover').css('opacity', '1');
		$('.right-seat-display').css('opacity', '0');
		$('.right-seat').css('left', '32%');
		$('.seat-display').css('width', '80%');
	})
	
	$('.m-inno-1').click(function() {
		$('.m-inno-1 .bg').css('height','100%');
		$('.m-inno-1 .m-img').css('height','108%');
		$('.m-inno-2 .bg').css('height','92%');
		$('.m1').css('opacity','1');
		$('.description1').css('opacity','1');
		$('.description2,.description3').css('opacity','0');
	})
	$('.m-inno-2').click(function() {
		$('.m-inno-1 .bg').css('height','47%');
		$('.m-inno-2 .bg').css('height','100%');
		$('.m-inno-1 .m-img').css('height','130%');
		$('.m-inno-2 .m-img').css('height','120%');
		$('.m1').css('opacity','0');
		$('.description1,.description3').css('opacity','0'); 
		$('.description2').css('opacity','1'); 
	})
	$('.m-inno-3').click(function() {
		$('.m-inno-2 .bg').css('height','60%');
		$('.m-inno-1 .bg').css('height','66%');
		$('.m-inno-2 .m-img').css('height','140%');
		$('.m1').css('opacity','1');
		$('.description1,.description2').css('opacity','0');
		$('.description3').css('opacity','1');
	})
	
	$('.cultrue-row-col').click(function(){
		if(IsMobile) { 
			$('.hover-txt').css({'height':'0'});
			$(this).find('.hover-txt').css({'height':'84px'});
		 } 
	
	})
})

$(window).on('scroll', function() {
	addClass('#m-tit01', 'fadeInUp40', 0.8);
	addClass('#m-tit02', 'fadeInUp40', 0.8);
	addClass('#m-tit03', 'fadeInUp40', 0.8);
	addClass('#m-tit04', 'fadeInUp40', 0.8);
	addClass('#m-tit07', 'fadeInUp40', 0.8);
	addClass('#m-tit05', 'fadeInUp40', 0.2);
	addClass('#m-tit06', 'fadeInUp40', 0.8);
	addClass('#m-tit08', 'fadeInUp40', 0.8);
	addClass('#m-tit09', 'fadeInUp40', 0.8);
	addClass('#m-tit10', 'fadeInUp40', 0.8);
	addClass('#m-tit11', 'fadeInUp40', 0.8);
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
 //数字动画
var countNumber = function() {
	var countNumberId = $('.mytimer');
	countNumberId.each(count);
	scrollTrue = false;
}
