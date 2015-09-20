$(document).ready(function() {

	showDateTime();
	// getDateTime();
	// getYelpSearch();
});

function getDateTime() {

	var now = new Date();
    var strDateTime = [[AddZero(now.getHours()), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");
    document.getElementById("Console").innerHTML = "Now: " + strDateTime;
};
    
function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}


function showDateTime() {
	var currentDateTime = getDateTime();

	var time = document.getElementById('time_box'); 
	time.appendChild(document.createTextNode(currentDateTime));



}