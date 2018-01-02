$(function() {

	// image distribution
	var html = $(document).width();
	if(html <= 400) {
		var childrenCount = $("#gallery").children().length;
		var child = $("#galery").children(".hidden-xs")
		for(i=0; i<childrenCount; i++) {

		}
	}

	// navigation transform
	var scroll = 0;
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		console.log(scroll);
		
		if(scroll >= 595) {
			$('.navbar').addClass('scrolled-nav');
			$(".navbar").addClass("scroll-height-up");
			$(".svg-logo").addClass('nav-logo');

			$("#navigator").mouseover(function(){
				$(".navbar").removeClass("scroll-height-up");
				$(".svg-logo").removeClass('nav-logo');
			})

			$("#navigator").mouseout(function(){
				$(".navbar").addClass("scroll-height-up");
				$(".svg-logo").addClass('nav-logo');
			})
		} else {
			$('.navbar').removeClass('scrolled-nav');
			$(".navbar").removeClass("scroll-height-up");
			$(".svg-logo").removeClass('nav-logo');

			$("#navigator").off("mouseover");
			$("#navigator").off("mouseout");
		}
	})

	// smooth anchor
	$("a").click(function(){
		if(this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			
			$("html, body").animate({
				scrollTop: $(hash).offset().top
			}, 600, function(){
				window.location.hash = hash;
			})
		}
	});

	// viewproject mod
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

	// span press2play
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

	// breaker game
	$("#breakerGame").ready(function(){
		// var canvas = $("#breakerGame");
		// var ctx = canvas.get(0).getContext("2d");
		var canvas = document.getElementById("breakerGame");
		var ctx = canvas.getContext('2d');
		var ball = Math.PI*2;
		var x = (canvas.width)/2;
		var y = canvas.height-30;
		var dx = 2;
		var dy = -2;
		var ballRadius = 5;
		var paddleHeight = 10;
		var paddleWidth = 75;
		var paddleX = (canvas.width-paddleWidth)
		var leftKey = false;
		var rightKey = false;
		var set = setInterval(draw, 10);

		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);

		function keyDownHandler(e) {
			if(e.keyCode == 39) 
				rightKey = true;
			else if(e.keyCode == 37)
				leftKey = true;
		}

		function keyUpHandler(e) {
			if(e.keyCode == 39) 
				rightKey = false;
			else if(e.keyCode == 37)
				leftKey = false;
		}

		function pamato() {
			ctx.beginPath();
			ctx.arc(x,y,ballRadius,0,ball,false);
			ctx.fillStyle = "white";
			ctx.fill();
			ctx.closePath();
		}

		function player() {
			ctx.beginPath();
			ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
			ctx.fillStyle = "white";
			ctx.fill();
			ctx.closePath();
		}

		function draw () {
			ctx.clearRect(0,0,canvas.width,canvas.height);
			pamato();
			player();

			if(y + dy < ballRadius)
				dy = -dy
			else if (y + dy > canvas.height-(ballRadius*2)) {
				if(x >= paddleX && x < paddleX + paddleWidth) {
					dy = -dy;
					// custom
					dy--;
					// dx++;
				} else if(y+dy > canvas.height+ballRadius) {
					// alert("You Lose.");
					clearInterval(set);
				} else if(x == paddleX && x < canvas.height) {
					dy = -dy;
					dy += 10;
					// dx++;
				}
			}

			if(x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
				dx = -dx
			}

			if(rightKey == true && paddleX+paddleWidth < canvas.width) {
				paddleX += 7
			}

			if(leftKey == true && paddleX > 0) {
				paddleX -= 7
			}

			x += dx;
			y += dy;

		}

		set;
	})
})