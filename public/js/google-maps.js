function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    // center: {lat: 41.85, lng: -87.65}
    center: {lat: 39.742431, lng: -104.681904}
    //39.742431, -104.681904
  });
  directionsDisplay.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsDisplay);
  
  // var onChangeHandler = function() {
  //   calculateAndDisplayRoute(directionsService, directionsDisplay);
  // };
  // document.getElementById('start').addEventListener('change', onChangeHandler);
  // document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    // origin: document.getElementById('start').value,
    // destination: document.getElementById('end').value,
    origin: '32100 E Colfax AveWatkins, CO 80137',
    destination: 'La Quinta Inn & Suites Denver Airport DIA6801 Tower Rd Denver, CO 80249',
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}