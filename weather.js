function getCity(city) {


var queryURL = "http://api.wunderground.com/api/e58ab528f4132c06/forecast/q/"+city+".json";

$.ajax({
    url: queryURL,
    method: "GET"
    })
    
    .then (function(response) {
        console.log(queryURL);
        console.log(response);
        console.log(response.forecast.txt_forecast.date);
        var x = document.createElement("IMG");
        x.setAttribute("src", response.forecast.txt_forecast.forecastday[0].icon_url);
        x.setAttribute("width", "70");
        x.setAttribute("height", "auto");
        x.setAttribute("alt", "The Pulpit Rock");
       // document.body.appendChild(x);
       console.log(x);
        $("#weather").html(x);
        $("#description").html("</br><p>Day: " +response.forecast.txt_forecast.forecastday[0].fcttext + 
        "</br>" + response.forecast.txt_forecast.forecastday[0].fcttext_metric +  "</p>");
       // console.log("<img>" + response.forecast.txt_forecast.forecastday[0].icon_url +">");
    });
    

};

$("#submit").click(function(){
    city= $("#city").val().trim();
    getCity(city);
   
  });




function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    }
    else {
        console.log("not available");
    
    } 
}
 

function showPosition(position) {
    var getLatitude = position.coords.latitude;
    var getLongitude = position.coords.longitude;
    console.log(getLatitude);
    console.log(getLongitude);
    
    var queryURL1 = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + getLatitude+"," + getLongitude+ "&sensor=true";

$.ajax({
    url: queryURL1,
    method: "GET"
    })
    
    .then (function(response) {
        console.log(response);
        console.log(response.results[0].address_components[5].short_name);
        console.log(response.results[0].address_components[2].long_name);
        state=response.results[0].address_components[5].short_name;
        cityName=response.results[0].address_components[2].long_name;
        var city= state+"/"+cityName;
        getCity(city);
    });
   
  
    

    // x.innerHTML = "Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude;
}

$( document ).ready(function() {
    
    getLocation();
    

});
