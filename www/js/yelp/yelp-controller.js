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
    var isFavoritesPage = false;
    var tempRestaurants = []; // Wordt gebruikt als cache als de favorieten worden getoond.

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
      $scope.showSnippetText = ($scope.restaurant.snippet_text !== undefined); // laat een card zien als er tekst is

      $scope.favorite = {};
      var favorite = false;
      var text = 'Favorites';

      // Lokale opslag zetten als die nog niet bestaat
      if($localStorage.favorites == undefined) $localStorage.favorites = [];
      var favorites = $localStorage.favorites;
      console.log(favorites);

      for(var i = 0; i < favorites.length; i++) {
        var favoriteId = favorites[i].id;
        if(favoriteId == restaurantId) {
          favorite = true;
          text = 'Unfavorite';
        }
      }
      $scope.favorite.text = text;
      $scope.favorite.bool = favorite;
    };

    $scope.addRemoveFavorite = function () {
      $scope.favorite.bool = !$scope.favorite.bool;
      // Toevoegen aan favorieten
      if($scope.favorite.bool)
      {
        $localStorage.favorites.push($scope.restaurant);
        $scope.favorite.text = 'Unfavorite';
      }
      // Verwijderen van favorieten
      else
      {
        var index = $localStorage.favorites.indexOf($scope.restaurant);
        if (index > -1) {
          $localStorage.favorites.splice(index, 1);
        }
        $scope.favorite.text = 'Favorites';
      }
    };

    $scope.loadFavorites = function () {
      console.log('laad favorieten');
      isFavoritesPage = !isFavoritesPage;

      if(isFavoritesPage) {
        if($localStorage.favorites == undefined) $localStorage.favorites = [];
        console.log($localStorage.favorites);

        // temp array vullen
        tempRestaurants = $scope.restaurants;
        $scope.restaurants = $localStorage.favorites;
      } else {
        $scope.restaurants = tempRestaurants;
        tempRestaurants = []; // legen om geheugen te verkleinen.
      }

    }
  }

})();

