// See post: http://asmaloney.com/2014/01/code/creating-an-interactive-map-with-leaflet-and-openstreetmap/

var map = L.map( 'map', {
    center: [46.818188, 8.227512],
    minZoom: 2,
    zoom: 10
  })
  
  L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a', 'b', 'c']
  }).addTo( map )
  
  var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' )
  
  var myIcon = L.icon({
    iconUrl: myURL + 'pin48.png',
    iconRetinaUrl: myURL + 'pin48.png',
    iconSize: [29, 24],
    iconAnchor: [9, 21],
    popupAnchor: [0, -14]
  })

var marker;

/*
var markers = [];
for (var i = 0; i < coords.length; ++i) {
    markers[i] = "some stuff";
}
*/


var updateMarker = function(lat, lng, currentTime) {
    if (marker) {
        marker.bindPopup(currentTime).setLatLng([lat, lng]);
    } else {
        marker = L.marker([lat, lng]).bindPopup(currentTime).addTo(map);
    }
    return false;
};

updateMarker(46.818188, 8.227512, "TEST");


var markers = [];
setInterval(function(){
    $.ajax({
        url: "/getdrones",
        dataType: "json",
        success: function(data) {
            for (var i = 0; i < data.drones.length; ++i){
                if (markers[i]){
                    markers[i].bindPopup(data.drones[i].name).setLatLng([data.drones[i].lat, data.drones[i].lon]);
                } else {
                    markers[i] = L.marker([data.drones[i].lat, data.drones[i].lon]).bindPopup(data.drones[i].name).addTo(map);
                }               
            }
        }
})}, 1000);



/*
setInterval(function(){
    $.ajax({
        url: "/getdrones",
        dataType: "json",
        success: function(data) {
            //$('#data').html(data.drones[]);
            updateMarker(data.lat, data.lon, "LAT: "+ data.lat.toString()+ "</br>LON: "+ data.lon.toString())
        }
})}, 1000);
*/


/*
setInterval(function(){
    $.ajax({
        url: "/newdrone",
        method: "post",
        dataType: "json",
        success: function(data) {
            //$('#data').html(data);
            //updateMarker(data.lat, data.lon, "LAT: "+ data.lat.toString()+ "</br>LON: "+ data.lon.toString())
        }
})}, 10000);
*/

  /*
  for ( var i=0; i < markers.length; ++i )
  {
   L.marker( [markers[i].lat, markers[i].lng], {icon: myIcon} )
    .bindPopup( '<a href="' + markers[i].url + '" target="_blank">' + markers[i].name + '</a>' )
    .addTo( map );
  }

  L.marker.setLatLng([lat, lng]).update();
  */