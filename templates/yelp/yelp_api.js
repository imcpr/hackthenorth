
// $(window).load(function () {

// 	getLocation();
// 	getYelpSearch();
	


// });

// $(document).ready(function() {
// 	// getLocation();
// 	// getYelpSearch();
// });

var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    x.innerHTML = "Latitude: " + latitude+ 
    "<br>Longitude: " + longitude;	
    // codeLatLng(latitude, longitude);
    getYelpSearch(latitude, longitude, null);
}


function getYelpSearch(lattitude, longitude, category_filter) {
    // https://gottayelp.herokuapp.com/get_nearby/0/0/

  // $.ajax({
  //       type: "GET",
  //       // accept: "*/*",
  //       // contentType: "application/x-www-form-urlencoded",
  //       dataType: "jsonp",
  //       // jsonpCallback: "yelpResultsCallBack",
  //       cache: false,
  //       url: "https://gottayelp.herokuapp.com/get_nearby/" + lattitude + "/" + longitude,
  //       success: function (data) {
  //           // console.log(data, bla, test);
  //           console.log(data);
  //       },
  //       error: function (data) {
  //           console.log(data)
  //       }
  //   });
    // $.get("https://gottayelp.herokuapp.com/get_nearby/" + lattitude + "/" + longitude, yelpResultsCallBack);

    $.ajax({
      method: "GET",
      url:  "https://gottayelp.herokuapp.com/get_nearby/" + lattitude + "/" + longitude,
      dataType: "json"
      // data: { name: "John", location: "Boston" }
    })
      .done(function( data ) {
        alert( "Data Saved: " + data );
      });

}

function yelpResultsCallBack (data) {

    // console.log(data);

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
