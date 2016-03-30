angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope) {

  var mymap = L.map('mapid').setView([52.2194, 6.8870], 15);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'norlock.pi27ck85',
    accessToken: 'pk.eyJ1Ijoibm9ybG9jayIsImEiOiJjaW1ld2RoZ20wMDQwdmptM3E1OXd6cHQyIn0.IThbBD1fZ4jfL7qfQ-XfLw'
  }).addTo(mymap);
})

.controller('RestaurantsNearbyCtrl', function($scope, Restaurants) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.restaurants = Restaurants.all();
  $scope.remove = function(restaurant) {
    Restaurants.remove(restaurant);
  };
})

.controller('RestaurantsDetailCtrl', function($scope, $stateParams, Restaurants) {
  $scope.restaurant = Restaurants.get($stateParams.restaurantId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller("OauthExample", function($scope, $cordovaOauth) {
  $scope.yelpLogin = function() {
    $cordovaOauth.google("CLIENT_ID_HERE", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
      console.log(JSON.stringify(result));
    }, function(error) {
      console.log(error);
    });
  }
});

