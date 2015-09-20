$(document).ready(function() {
	getFavourites();
});

function getFavourites() {
	$.ajax({
        type: "GET",
        cache: false,
        url: "http://127.0.0.1:8000/get_favourites/",
        success: function (data) {
            businessData = data;
            populateFavourite(data);
            populateRecentlyVisited(data[data.length-1]);
        },
        error: function (data) {
            businessData = data;
            populateFavourite(data);
            populateRecentlyVisited(data[data.length-1]);
        }
    });

};

function populateFavourite(data) {
    if (data) {
        for (i = 0; i < data.length; i++) { 
            var response = data[i];
            document.getElementById('favourite_places').appendChild(createData(response, false));

        }
    }   
}

function populateRecentlyVisited(recentlyVisited) {
    document.getElementById('recently_visited').appendChild(createData(recentlyVisited, true));
   
}

function createData(data, isRecent) {
    var division = document.createElement('div');
    division.className = 'place';

    var image = document.createElement('img');
    image.src = data.image_url;
    image.className = "circular_image";
    division.appendChild(image);

    var header = document.createElement('div');
    header.className = "place_name";
    header.innerText = data.name;
    division.appendChild(header);

    var starRating = document.createElement('img');
    if (isRecent === true) {
        starRating.src = "/static/assets/" + getRatingStarUrl(00) + ".png";
    } else {
        starRating.src = "/static/assets/" + getRatingStarUrl(data.rating) + ".png";
    }
    starRating.className = " starRating " + getRatingStarUrl(data.rating);
    division.appendChild(starRating);

    if (isRecent == true) {
        var blackxButton = document.createElement('button');
        blackxButton.className = "blackX";
        blackxButton.onclick = removeFavourite;
        division.appendChild(blackxButton);
    }
    return division;
}

function removeFavourite() {
    $( "#recently_visited_section" ).slideUp();
    $( ".horizontalLine" ).slideUp();
    $(".backErrow" ).slideToggle( "slow" );
}

function goBack () {
    window.location.href= 'http://127.0.0.1:8000/foodordrink/';
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
    } else {
        return "00star";
    }
}

