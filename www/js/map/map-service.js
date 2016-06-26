/**
 * Created by norlock on 5/15/16.
 */
(function () {
  'use strict';

  angular
    .module('tg.app')
    .service('MapService', MapService);

  MapService.$inject = ['$cordovaGeolocation', '$ionicPopup'];

  /* @ngInject */
  function MapService($cordovaGeolocation, $ionicPopup) {
    this.getLat = getLat;
    this.getLng = getLng;
    this.getRouteTowards = getRouteTowards;
    this.loadMap = loadMap;

    var lat = 52.2215, lng = 6.8937; // default enschede
    var map = {}, latLng = new google.maps.LatLng(lat,lng);
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    function loadMap() {
      var options = {timeout: 10000, enableHighAccuracy: true};
      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      directionsDisplay.setMap(map);

      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        latLng = new google.maps.LatLng(lat, lng);
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        mapOptions.center = latLng;
        locateUser(latLng);
      }, function(){
        $ionicPopup.alert({
          title: 'An error occurred',
          template: 'Can\'t retrieve user location'
        });
      });
    }

    function locateUser(latLng) {

      //Wait until the map is loaded
      google.maps.event.addListenerOnce(map, 'idle', function(){

        var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });
        var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
        });

      });
    }

    function getLat() {
      return lat;
    }

    function getLng() {
      return lng;
    }

    function getRouteTowards(latTowards, lngTowards) {
      directionsService.route({
        origin: {lat: lat, lng: lng},  // Haight.
        destination: {lat: latTowards, lng: lngTowards},  // Ocean Beach.

        travelMode: google.maps.TravelMode["WALKING"]
      }, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

  }

})();

