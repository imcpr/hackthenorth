var currentBusiness = 0;
var businessData = null;

$(document).ready(function() {
	getLocation();
});

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

function no_business() {
    currentBusiness++; 
    if (businessData && currentBusiness <= 5) {
        populateBuisinessData(businessData, currentBusiness);
    }
}

function bookmark_business() {

    var data =  businessData[currentBusiness];

    var categories = ''; 
    for (i = 0; i < data.categories.length; i++) { 
        if (i === (data.categories.length - 1)) {
            categories += data.categories[i][1];
        } else {
            categories += data.categories[i][1] + ",";
        }
    }

    var csrftoken = getCookie('csrftoken');
    var objectData =
    {
        name: data.name,
        image_url: data.image_url,
        rating: data.rating,
        categories: categories,
        distance: data.distance,
        CSRF: csrftoken
    };

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/set_favorite/",
        dataType: "json",
        data: objectData, 
        success: function (data) {
        },
        error: function (data) {
        }
    });

    window.location.href= 'http://127.0.0.1:8000/favourites/';

}

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

var csrftoken = getCookie('csrftoken');

$.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function populateBuisinessData(data, count)
{
    if (data) {
        var response = data[count];
        if (data.length > 0) {
           
            var image = document.getElementById('businessImage');
            image.src = response.image_url.substring(0, response.image_url.lastIndexOf("/")) + "/l.jpg";
            
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

function getRatingStarUrl (rating) {
    if(rating === 0.5) {
        return "05star";
    } else if (rating === 1.0) {
        return "10star";
    } else if (rating === 1.5) {
        return "15star";
    } else if (rating === 2.0) {
        return "20star";
    } else if (rating === 2.5) {
        return "25star";
    } else if (rating === 3.0) {
        return "30star";
    } else if (rating === 3.5) {
        return "35star";
    } else if (rating === 4.0) {
        return "40star";
    } else if (rating === 4.5) {
        return "45star";
    } else if (rating === 5.0) {
        return "50star";
    }
}