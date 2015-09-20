$(document).ready(function() {

	getDateTime();
	// getDateTime();
	// getYelpSearch();
});

function getDateTime() {

	var now = new Date();
    var strDateTime = [[AddZero(now.getHours()), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");
    document.getElementById("time_box").innerText = strDateTime;
};
    
function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}


function food_button() {
	window.location.href= 'http://127.0.0.1:8000/'

}

function drink_button() {
	window.location.href='http://127.0.0.1:8000/'

}