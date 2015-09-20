var currentBusiness = 0;
var businessData = null;

$(document).ready(function() {
	getFavourites();
});

function getFavourites() {

	getLocation();

};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getYelpSearch(latitude, longitude, null);
}


function getYelpSearch(lattitude, longitude, category_filter) {
  $.ajax({
        type: "GET",
        cache: false,
        url: "http://127.0.0.1:8000/get_nearby/" + lattitude + "/" + longitude +"/",
        success: function (data) {
            businessData = data;
            populateBuisinessData(data, currentBusiness);
        },
        error: function (data) {
            businessData = data;
            populateBuisinessData(data.responseText, currentBusiness);
        }
    });
}
    

function populateBuisinessData(data, count)
{
    if (data) {
        var response = data[count];
        if (data.length > 0) {
           
            var image = document.getElementById('businessImage');
            image.src = response.image_url;
            
            var name = response.name;
            if (name.length > 22) {
                name.value = name.substring(0, 21) + '...';
            }
            var title = document.getElementById('businessTitle');
            title.innerText = name;

            var starRating = document.getElementById('businessRating');
            starRating.src = "/static/assets/" + getRatingStarUrl(response.rating) + ".png";
            starRating.className = " starRating " + getRatingStarUrl(response.rating);

            var categories = response.categories; 
            var snippet_text = document.getElementById('businessSubInfo');
            var concatCategories = ''; 
            for (i = 0; i < categories.length; i++) { 
                if (i === (categories.length - 1)) {
                    concatCategories += categories[i][0];
                } else {
                    concatCategories += categories[i][0] + ", ";
                }
            }
            
            snippet_text.innerText = concatCategories;

            var distance = document.getElementById('businessDistance');
            distance.innerText = response.distance + " km";


        }
    }   
}
