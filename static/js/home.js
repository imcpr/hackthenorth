$(document).ready(function() {

	$( ".munchies_logo" ).fadeIn( 2000, function() {

		$( ".home_body" ).animate({
		    marginTop: "24em"
		  }, 500, function() {
		    // Animation complete.
		  });
		$(".app_title" ).slideToggle( "slow" );
		$(".app_title").fadeIn(1500).dequeue(); 
		redirectToFoodorDrink();
  	});

  	
});

function redirectToFoodorDrink() {
	window.setTimeout(function(){
        window.location.href = "http://127.0.0.1:8000/foodordrink/";
    }, 2000);
}