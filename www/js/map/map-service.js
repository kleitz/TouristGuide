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
    try {
      var map = {}, latLng = new google.maps.LatLng(lat,lng);
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;
    } catch (err) {
      $ionicPopup.alert({
        title: 'Can\'t load map',
        template: 'To use the map make sure you have connection with the internet'
      });
    }

    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });

    function onMapSuccess(position) {
      console.log(position);
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      loadMap();
    }

    function onMapError(error) {
      $ionicPopup.alert({
        title: 'An error occurred',
        template: 'Can\'t retrieve user location'
      });
    }


    function loadMap() {
      latLng = new google.maps.LatLng(lat, lng);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      directionsDisplay.setMap(map);

      var marker = new google.maps.Marker({
        position: latLng
      });

      marker.setMap(map);
      map.setZoom(15);
      map.setCenter(marker.getPosition());

    }

    function getLat() {
      return lat;
    }

    function getLng() {
      return lng;
    }

    function getRouteTowards(latTowards, lngTowards) {
      directionsService.route({
        origin: {lat: lat, lng: lng},
        destination: {lat: latTowards, lng: lngTowards},

        travelMode: google.maps.TravelMode["WALKING"]
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

  }

})();

