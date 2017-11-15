$(function() {
	var scroll = 0;
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		
		if(scroll >= 500) {
			$('.navbar').addClass('scrolled-nav');
			$(".svg-logo").addClass('nav-logo');
		} else {
			$('.navbar').removeClass('scrolled-nav');
			$(".svg-logo").removeClass('nav-logo');
		}
	})

	$('.view-project').mouseover(function(){
		var image = $(this).attr('content');

		$('.projects').css({
			"background-image" : "url(" + image + ")",
			"box-shadow" : "5px 0px 50px rgba(0,0,0,0.7) inset"
		})
		
		if(image == "images/tiangg-e.jpg") {
			$(this).css({
				"color" : "white"
			})
		}
	})

	$('.view-project').mouseout(function(){
		$(this).css({
				"color" : "#560000"
			})
	})

	var	count = $('.press2play-container').children().length;
	$('#reward').hide();
	$('.press2play-container').on("click", ".press2play", function() {
		count--;
		$(this).remove();

		if(count == 0) {
			$('.press2play-container').html("<h1>YOU WIN!</h1>");
			$('#reward').show();
		}
	})
})