var animate = false;
var wScroll;
var categoryDelay;

$(document).ready(function() {
	wscr();
	mobmenu();	

	$(".out").on("click", ".mobmenu-toggle", function (event) {
		$("body,html").animate({scrollTop: 0}, 300);
		if(!animate) {
			animate = true;
			$(this).toggleClass("active");
			$(".mobmenu").toggleClass("open");
			if($(".mobmenu").hasClass("open")) {
				$("body").css("padding-right", wScroll + "px");
				setTimeout(function(){
					$("body").addClass("openmenu");
					animate = false;
				}, 600);
			}
			else {
				$("body").removeClass("openmenu");
				$("body").css("padding-right", "0px");
				setTimeout(function(){
					animate = false;
				}, 600);
			}
		}
		return false;
	});

	$(".out").on("click", ".scroll", function (event) {
		elementClick = $(this).attr("href");
		destination = $(elementClick).offset().top ;
		$("body,html").animate({scrollTop: destination }, 600);
		return false;
	});

	$('.categories .categories__list .category__name a').hover(
		function(){
			var link = $(this)			
			categoryDelay = setTimeout(function(){
				link.parents(".category").addClass("open").find(".category__image").fadeIn(300);
			}, 200);
		},
		function(){
	});

	$('.categories .categories__list .category').hover(
		function(){
		},
		function(){
			clearTimeout(categoryDelay);
			$(this).removeClass("open").find(".category__image").fadeOut(300);
	});

	$(".faqs").on("click", ".faq__question", function (event) {
		$(this).parents(".faq").toggleClass("open").find(".faq__answer").slideToggle(300);
	});

	if($("*").is(".reviews__carousel")) {
		$(".reviews__carousel").owlCarousel({ 
			loop: true,
			nav: true,
			dots: false,
			items: 4,
			margin: 16,
			navText: ["", ""],
			navContainer: $(".reviews .title .owl-nav"),
			responsive:{
				0:{
					items: 1
				},
				360:{
					items: 2
				},	        
				768:{
					items: 3
				},
				992:{
					items: 4
				}
			}
		});
	}

	$("body").on("click", ".openmodal", function(event){
		var modal = $(this).attr("href");

		$.fancybox.open({
			src : modal,
			touch : false,
			type : 'inline',
			autoFocus: false,
			beforeShow: function( instance, slide ) {
			},
			afterClose: function( instance, slide ) {
			}
		});

		return false;
	});

	if($("*").is(".reviews")) {
		$('[data-fancybox="reviews"]').fancybox({
			hash: false,
			backFocus: false
		});
	}

	if($("*").is(".productdetail")) {
		var thumbs = $(".productdetail__thumbs").owlCarousel({ 
			loop: false,
			nav: true,
			dots: false,
			items: 4,
			margin: 12,
			navText: ["", ""],
			responsive: {
				0:{
					items: 3,
				},
				992:{
					items: 4,
				}
			}
		});

		$(".productdetail__thumbs .productdetail__thumb").click(function() {		
			if(!$(this).hasClass("active")) {
				var index = $(".productdetail__thumbs .productdetail__thumb").index($(this));
				$(".productdetail__thumbs .productdetail__thumb").removeClass("active");
				$(this).addClass("active");			
				slideshow.owlCarousel('to', index);
			}
			return false;
		});

		var slideshow = $(".productdetail__slideshow").owlCarousel({ 
			loop: false,
			nav: false,
			dots: false,
			items: 1,
			margin: 16,
			navText: ["", ""],
			onChanged: function callback(event) {
				$(".productdetail__thumbs .productdetail__thumb").removeClass("active");
				$(".productdetail__thumbs .productdetail__thumb:eq(" + event.item.index + ")").addClass("active");
				thumbs.owlCarousel('to', event.item.index);
			},
			onInitialized: function callback(event) {
				$(".productdetail__thumbs .productdetail__thumb:eq(" + event.item.index + ")").addClass("active");
				thumbs.owlCarousel('to', event.item.index);
			},
		});
	}

	if($("*").is(".products-carousel")) {
		$('.products-carousel').each(function(){
			var carousel = $(this).find(".products__carousel");
			carousel.owlCarousel({
				loop: true,
				nav: true,
				dots: false,
				items: 4,
				margin: 16,
				navText: ["", ""],
				navContainer: carousel.parents(".products-carousel").find(".title .owl-nav"),
				responsive:{
					0:{
						items: 1
					},
					360:{
						items: 2
					},
					768:{
						items: 3
					},
					992:{
						items: 4
					}
				}
			});
		});
	}

	if($("*").is(".categories__filter")) {
		$(".categories__panel:not(.open)").hide(0);


		$(".categories__filter").on("click", ".btn", function (event) {
			link = $(this);
			if(!link.parent().hasClass("active")) {
				$(".categories__filter .active").removeClass("active").find(".btn").removeClass("btn-primary");
				$(".categories__panel").removeClass("open");

				setTimeout(function(){
					link.parent().addClass("active").find(".btn").addClass("btn-primary");
					$(".categories__panel").hide(0);
					$(link.attr("href")).show(0).addClass("open");
				}, 300);
			}
			return false;
		});
	}

	if($("*").is("#map")) {
		ymaps.ready(function () {
			myMap = new ymaps.Map('map', {
				center: [47.211704, 39.648376],
				controls: [],
				zoom: 15,	      
			}, {
				searchControlProvider: 'yandex#search'
			});

			zoomControl = new ymaps.control.ZoomControl({
				options: {
					position: {
						right: 20,
						top: 20
					}
				}
			});

			myMap.controls.add(zoomControl);
			myMap.behaviors.disable('scrollZoom');

			myMap.geoObjects
				.add(new ymaps.Placemark([47.211704, 39.648376], {
			}, {
				iconLayout: 'default#image',
				iconImageHref: 'tpl/img/icons/map-pointer.svg',
				iconImageSize: [42, 46],
				iconImageOffset: [-21, -40]
			}));
		});
	}
});

$(window).on("load", function(e) {
	wscr();
});

$(window).resize(function() {
	setTimeout(function(){
		wscr();
	}, 500);
});

function wscr() {
	if($(document).height() > $(window).height()) {
		var block = $('<div>').css({'height':'50px','width':'50px'}),
		indicator = $('<div>').css({'height':'200px'});

		$('body').append(block.append(indicator));
		var w1 = $('div', block).innerWidth();    
		block.css('overflow-y', 'scroll');
		var w2 = $('div', block).innerWidth();
		$(block).remove();
		wScroll = w1 - w2;
	}
	else {
		wScroll = 0;
	}
}

function mobmenu() {
	$("body").append('<div class="mobmenu"><div class="mobmenu__table"><div class="mobmenu__content"><div class="container"></div></div></div></div>');
	$(".mobmenu .container").append('<div class="mobmenu__nav">' + $(".header .header__nav").html() + '</div>');
	$(".mobmenu .container").append('<div class="mobmenu__phones phones">' + $(".topline .topline__phones").html() + '</div>');
	$(".mobmenu .container").append('<div class="mobmenu__socials socials">' + $(".topline .topline__socials").html() + '</div>');
	$(".mobmenu .container").append('<div class="mobmenu__button">' + $(".header .header__button").html() + '</div>');
}