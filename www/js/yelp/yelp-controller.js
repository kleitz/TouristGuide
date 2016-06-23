/**
 * Created by norlock on 6/22/16.
 */
(function () {
  'use strict';

  angular
    .module('tg.app')
    .controller('YelpCtrl', YelpCtrl);

  YelpCtrl.$inject = ['$scope', 'YelpService', 'MapService', '$ionicPopup', '$stateParams', '$localStorage'];

  /* @ngInject */
  function YelpCtrl($scope, YelpService, MapService, $ionicPopup, $stateParams, $localStorage) {

    $scope.loadRestaurants = function() {
      var map = MapService.getMap();
      var lat, lng = {};
      if(map._lastCenter == undefined) { // zet enschede als standaard
        lat = 52.2215;
        lng = 6.8937;
      }
      else { // zet locatie
        lat = map._lastCenter.lat;
        lng = map._lastCenter.lng;
      }

      YelpService.getRestaurants(lat, lng).then(function (result) { // TODO lat long vanaf de kaart
        console.log(result);
        $scope.restaurants = result;
      }, function (result) {
        console.log(result);
        $ionicPopup.alert({
          title: 'An error occurred',
          template: 'Can\'t retrieve restaurants nearby'
        });
      });
    };

    $scope.getRestaurantById = function () {
      var restaurantId = $stateParams.id;
      $scope.restaurant = YelpService.getRestaurantById(restaurantId);
      isRestaurantFavorite(restaurantId);
    };

    function isRestaurantFavorite(restaurantId) {
      $scope.favorite = {};
      $scope.favorite.bool = false;
      $scope.favorite.text = 'Add to favorites';

      // Lokale opslag zetten als die nog niet bestaat
      if($localStorage.favorites == undefined) {
        $localStorage.favorites = [];
      }

      var favorites = $localStorage.favorites;
      console.log(favorites);

      for(var i = 0; i < favorites.length; i++) {
        var favoriteId = favorites[i].id;
        if(favoriteId == restaurantId) {
          $scope.favorite.bool = true;
          $scope.favorite.text = 'Remove from favorites';
        }
      }
    }

    $scope.addRemoveFavorite = function () {
      $scope.favorite.bool = !$scope.favorite.bool;
      // Toevoegen aan favorieten
      if($scope.favorite.bool)
      {
        $localStorage.favorites.push($scope.restaurant);
        $scope.favorite.text = 'Remove from favorites';
      }
      // Verwijderen van favorieten
      else
      {
        var index = $localStorage.favorites.indexOf($scope.restaurant);
        if (index > -1) {
          array.splice(index, 1);
        }
        $scope.favorite.text = 'Add to favorites';
      }
    }
  }

})();

