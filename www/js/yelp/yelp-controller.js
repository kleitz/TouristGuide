/**
 * Created by norlock on 6/22/16.
 */
(function () {
  'use strict';

  angular
    .module('tg.app')
    .controller('YelpCtrl', YelpCtrl);

  YelpCtrl.$inject = ['$scope', 'YelpService', 'MapService', '$ionicPopup', '$stateParams', '$localStorage', '$ionicScrollDelegate', '$state', '$cordovaNetwork'];

  /* @ngInject */
  function YelpCtrl($scope, YelpService, MapService, $ionicPopup, $stateParams, $localStorage, $ionicScrollDelegate, $state, $cordovaNetwork) {
    var isFavoritesPage = false;
    var tempRestaurants = []; // Wordt gebruikt als cache als de favorieten worden getoond.
    $scope.favoritesOrOverviewTxt = "Favorites";
    $scope.isOnline = $cordovaNetwork.isOnline();
    $scope.HideHasNoFavoritesYelpTxt = true;

    $scope.loadRestaurants = function() {
      if($cordovaNetwork.isOnline()) {
        YelpService.getRestaurants(MapService.getLat(), MapService.getLng()).then(function (result) { // TODO lat long vanaf de kaart
          $scope.restaurants = result;
        }, function (result) {
          console.log(result);
          $ionicPopup.alert({
            title: 'An error occurred',
            template: 'Can\'t retrieve restaurants nearby'
          });
        });
      }
    };

    $scope.getRestaurantById = function () {
      var restaurantId = $stateParams.id;
      console.log(restaurantId);
      $scope.favorite = false;

      if($localStorage.favorites == undefined) $localStorage.favorites = [];

      if(!$cordovaNetwork.isOnline()) {
        $scope.restaurant = YelpService.getRestaurantById(restaurantId, $localStorage.favorites);
      }
      else {
        $scope.restaurant = YelpService.getRestaurantById(restaurantId, $scope.restaurants);
      }

      var favorites = $localStorage.favorites;
      var favorite = false;

      for(var i = 0; i < favorites.length; i++) {
        var favoriteId = favorites[i].id;
        if(favoriteId === restaurantId) {
          favorite = true;
        }
      }

      $scope.favorite = favorite;

      $scope.showSnippetText = ($scope.restaurant.snippet_text !== undefined); // laat een card zien als er tekst is
    };

    $scope.addRemoveFavorite = function () {
      $scope.favorite = !$scope.favorite;

      // Toevoegen aan favorieten
      if($scope.favorite) {
        $localStorage.favorites.push($scope.restaurant);
      }
      // Verwijderen van favorieten
      else
      {
        var restaurantFav = {};
        for(var i = 0; i < $localStorage.favorites.length; i++) {
          var restaurant = $localStorage.favorites[i];
          if(restaurant.id === $scope.restaurant.id) {
            restaurantFav = restaurant;
          }

          $localStorage.favorites.splice($localStorage.favorites.indexOf(restaurantFav), 1);
        }
      }

      $scope.HideHasNoFavoritesYelpTxt = $localStorage.favorites.length > 0;
    };

    $scope.loadFavorites = function () {
      $ionicScrollDelegate.scrollTop();
      isFavoritesPage = !isFavoritesPage;

      if(isFavoritesPage) {
        $scope.favoritesOrOverviewTxt = "Overview";
        if($localStorage.favorites == undefined) $localStorage.favorites = [];
        $scope.HideHasNoFavoritesYelpTxt = $localStorage.favorites.length > 0;

        // temp array vullen
        tempRestaurants = $scope.restaurants;
        $scope.restaurants = $localStorage.favorites;

        console.log($scope.restaurants);
      } else {
        $scope.favoritesOrOverviewTxt = "Favorites";
        $scope.HideHasNoFavoritesYelpTxt = true;
        $scope.restaurants = tempRestaurants;
        tempRestaurants = [];
      }
    };

    $scope.getRoute = function () {
      var lat = $scope.restaurant.location.coordinate.latitude;
      var lng = $scope.restaurant.location.coordinate.longitude;
      $state.go('tab.map');
      MapService.getRouteTowards(lat, lng);
    };
  }

})();

