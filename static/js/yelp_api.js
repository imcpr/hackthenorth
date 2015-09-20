
// $(window).load(function () {

// 	getLocation();
// 	getYelpSearch();
	


// });

$(document).ready(function() {
	getLocation();
	// getYelpSearch();
});

// var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        // x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // x.innerHTML = "Latitude: " + latitude+ 
    // "<br>Longitude: " + longitude;	
    // codeLatLng(latitude, longitude);
    getYelpSearch(latitude, longitude, null);
}


function getYelpSearch(lattitude, longitude, category_filter) {
    // https://gottayelp.herokuapp.com/get_nearby/0/0/

  $.ajax({
        type: "GET",
        // accept: "*/*",
        // contentType: "application/x-www-form-urlencoded",
        // dataType: "jsonp",
        // jsonpCallback: "yelpResultsCallBack",
        cache: false,
        url: "http://127.0.0.1:8000/get_nearby/" + lattitude + "/" + longitude +"/",
        success: function (data) {
            // console.log(data, bla, test);
            populateBuisinessData(data, 0);
            // console.log(data);
        },
        error: function (data) {

            populateBuisinessData(data.responseText, 0);
        }
    });
     // $.get("http://127.0.0.1:8000/get_nearby/" + lattitude + "/" + longitude, yelpResultsCallBack);

    /*$.ajax({
      method: "GET",
      url:  "http://127.0.0.1:8000//get_nearby/" + lattitude + "/" + longitude,
      dataType: "json"
      // data: { name: "John", location: "Boston" }
    })
      .done(function( data ) {
        alert( "Data Saved: " + data );
      });*/

}

function yelpResultsCallBack (data) {

    console.log(data);



}

function populateBuisinessData(data, count)
{
    // var count = 1;
    if (data) {
        // var response = eval('(' + data + ')');
        var response = data;
        // for (var i=0; i<data.items.length; i++)
        // {
        if (response.businesses.length > 0) {
            // var division = document.createElement('div');
            // division.className = 'business';
            

            var image = document.getElementById('businessImage');
            image.src = response.businesses[count].image_url;
            // division.appendChild(image);
            
            var name = response.businesses[count].name;
            if (name.length > 22) {
                name = name.substring(0, 21) + '...';
            }
            var title = document.getElementById('businessTitle');
            title.appendChild(
                document.createTextNode(name));

            var text_info = response.businesses[count].snippet_text; 
            var snippet_text = document.getElementById('businessSubInfo');
            // if (text_info.length > 50) {
            //     text_info = text_info.substring(0, 49) + '...';
            // }
            snippet_text.appendChild(
                document.createTextNode(text_info));


            // division.appendChild(title);

            // var image = document.createElement('img')
            // image.appendChild(
            //     document.createImageNode(response.businesses[count].image_url));
            // division.appendChild(image);
            // image.className = 'business_image'; 
            // var image_url = document.createElement

            // var paragraph = document.createElement('p');
            // paragraph.className = 'description';
            // paragraph.appendChild(document.createTextNode(
            //     'Description: ' + data.items[count].description));
            // paragraph.appendChild(document.createTextNode(
            //     'Link: ' + data.items[i].link));
            // paragraph.appendChild(document.createTextNode(
            //     'Published Date: ' + data.items[count].pubDate));
            // division.appendChild(paragraph);
            // document.getElementById('business_info').appendChild(
            //     division);
        }
    }   
}


// function codeLatLng(lat, lng) {

//     var latlng = new google.maps.LatLng(lat, lng);
//     geocoder.geocode({'latLng': latlng}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//     console.log(results)
//     if (results[1]) {
//      //formatted address
//      alert(results[0].formatted_address)
//     //find country name
//          for (var i=0; i<results[0].address_components.length; i++) {
//         for (var b=0;b<results[0].address_components[i].types.length;b++) {

//         //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
//             if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
//                 //this is the object you are looking for
//                 city= results[0].address_components[i];
//                 break;
//             }
//         }
//     }
//     //city data
//     alert(city.short_name + " " + city.long_name)


//     } else {
//       alert("No results found");
//     }
//     } else {
//     alert("Geocoder failed due to: " + status);
//     }
//     });
// }
