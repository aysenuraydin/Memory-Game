"use strict";

$(document).ready(function() {

    var app = {

        butterflys : [1,2,3,4,5,6,7,8,9,10],
        clickCount : 0,
        canClick : true,
        
        isCanClick : function () {

            if(app.canClick) {
                app.canClick = false;
                $(".mcard").css("cursor","no-drop");
            } else {
                app.canClick = true;
                $(".mcard").css("cursor","pointer");
            }
        },
        init: function() { 
			for (var i = 0; i < 4; i++) {

                let r = Math.round(Math.random() * (app.butterflys.length-1));
                app.butterflys.splice(r,1);
			}
            app.butterflys=app.butterflys.concat(app.butterflys);
            app.shuffle();
        },
        shuffle: function() {

            var random=0;
			var temp=0;
			for (var i = 0; i < app.butterflys.length; i++) {

				random=Math.round(Math.random() * i);
			
				temp = app.butterflys[i];
				app.butterflys[i]=app.butterflys[random];
				app.butterflys[random]=temp;
			}
            console.log(app.butterflys);
            app.indexCards();
		},
		indexCards: function() {
            
			$('.mcard').each(function(i){
                $( this ).attr("data-index" ,app.butterflys[i]);
			});
            app.loadingCard();
		},
        loadingCard: function() {

            $('.mcard').each(function(i){
                $(this).html(`<img src="img/k${$( this ).attr("data-index")}.png">`);
			});
            app.clickCard();
        },
        clickCard: function() {
            
            $('.mcard').click(function(e){
                if(!app.canClick) {
                    e.preventDefault();
                }else {
                    $(this).addClass("selected");
                    app.selectControl();
                }
			});
            $('#reset').click(function(){
                app.reset();
			});
        },
        selectControl: function() {
            
            $("#counter").text(app.clickCount += 1);
            if($('.selected').length == 2) {

                app.isCanClick();
                setTimeout(function(){
                    if($('.selected').first().attr("data-index") == $('.selected').last().attr("data-index")) {

                        $('.selected').addClass("matched");
                        app.isFinish();
                    }
                    $('.selected img').addClass("z-index");
                    $('.selected').removeClass("selected");
                    app.isCanClick();
                },2500);  
            }
        },
        isFinish: function() {

            if($('.matched').length == 12) {
                
                setTimeout(function(){ 
                    $(".finish").html( $(".d-none").html() );
                },2000); 
            }
        },
        reset: function() {
            location.reload();
		}
    }
    app.init();
})

