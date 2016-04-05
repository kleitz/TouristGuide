angular.module('starter.controllers', [])
.constant('YelpApiUrl', 'https://api.yelp.com/v2/')

.controller('MapCtrl', function($scope) {

  var mymap = L.map('mapid').setView([52.2194, 6.8870], 15);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'norlock.pi27ck85',
    accessToken: 'pk.eyJ1Ijoibm9ybG9jayIsImEiOiJjaW1ld2RoZ20wMDQwdmptM3E1OXd6cHQyIn0.IThbBD1fZ4jfL7qfQ-XfLw'
  }).addTo(mymap);
})

.controller('RestaurantsNearbyCtrl', function($scope, $http, YelpApiUrl) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var httpMethod = 'GET',
      endPoint = 'search/?location=San Francisco, CA',
      parameters = {
        oauth_consumer_key : '6CCgnRLENZ-dCYvYZ-MTsA',
        oauth_token : 'Qw_T4w8U3Ur5qIgsQwrdhkalitIM4SQv',
        oauth_nonce : randomString(16),
        oauth_timestamp : Date.now(),
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0'
      },
      consumerSecret = 'CA-7yCPviP6GWQa8KM-qXxLWHXE',
      tokenSecret = 'Va2KxCcKyCXH9H7yoMdMU8VDDHM',

      encodedSignature = oauthSignature.generate(httpMethod, YelpApiUrl + endPoint, parameters, consumerSecret, tokenSecret),
      signature = oauthSignature.generate(httpMethod, YelpApiUrl + endPoint, parameters, consumerSecret, tokenSecret,
          { encodeSignature: false});

  parameters['oauth_signature'] = encodedSignature;

  // Simple GET request example:
  $http.get('http://localhost:8100/v2/' + endPoint, parameters).then(successCallback, errorCallback);

})

.controller('RestaurantsDetailCtrl', function($scope, $stateParams, Restaurants) {
  $scope.restaurant = Restaurants.get($stateParams.restaurantId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

function successCallback(response) {
  // this callback will be called asynchronously
  // when the response is available
  console.log(response);
}

function errorCallback(response) {
  // called asynchronously if an error occurs
  // or server returns response with an error status.
  console.log(response);
}

var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};