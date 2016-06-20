/**
 *
 */
/**
 * Created by norlock on 5/15/16.
 */
(function () {
  'use strict';

  angular
    .module('tg.map')
    .controller('MapCtrl', MapCtrl);

  MapCtrl.$inject = ['$scope', 'MapService', 'YelpService', '$ionicPopup'];

  function MapCtrl($scope, MapService, YelpService, $ionicPopup) {

    $scope.loadMap = function() {
      MapService.loadMap();
    };

    $scope.restaurants = function () {
      var map = MapService.getMap();
      var lat, lng = {};
      if(map._lastCenter == undefined) { // zet enschede
        lat = 52.2215;
        lng = 6.8937;
      }
      else { // zet locatie
        lat = map._lastCenter.lat;
        lng = map._lastCenter.lng;
      }

      YelpService.getRestaurants(lat, lng).then(function (result) { // TODO lat long vanaf de kaart
        console.log(result);
      }, function (result) {
        console.log(result);
        $ionicPopup.alert({
          title: 'An error occurred',
          template: 'Can\'t retrieve restaurants nearby'
        });
      });
    }
  }
})();
