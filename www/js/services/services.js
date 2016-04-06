angular.module('starter.services', [])

.factory('Restaurants', function($http, YelpApiUrl) {
  // Might use a resource here that returns a JSON array

  var httpMethod = 'GET',
      endPoint = 'search',
      parameters = {
        callback: 'angular.callbacks._0',
        ll : 52.2215 + ',' + 6.8937,
        term : 'food',
        accuracy: 100,
        oauth_consumer_key : '6CCgnRLENZ-dCYvYZ-MTsA',
        oauth_token : 'Qw_T4w8U3Ur5qIgsQwrdhkalitIM4SQv',
        oauth_nonce : randomString(16),
        oauth_timestamp : (Date.now() / 1000),
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0'
      },
      consumerSecret = 'CA-7yCPviP6GWQa8KM-qXxLWHXE',
      tokenSecret = 'Va2KxCcKyCXH9H7yoMdMU8VDDHM',

      signature = oauthSignature.generate(httpMethod, YelpApiUrl + endPoint, parameters, consumerSecret, tokenSecret,
          { encodeSignature: false});
  parameters['oauth_signature'] = signature;
  console.log(parameters);
  // Simple GET request example:
  $http.get('http://localhost:8100/v2/' + endPoint, parameters).then(successCallback, errorCallback);

  // Some fake testing data
  var restaurants = [{
    id: 0,
    name: 'Mac Donalds',
    ratingUrl: '3/5',
    imageUrl: 'img/ben.png'
  }, {
    id: 1,
    name: 'Pizzaria',
    ratingUrl: '4/5',
    imageUrl: 'img/max.png'
  }, {
    id: 2,
    name: 'Hamburger',
    ratingUrl: '4/5',
    imageUrl: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Pannekoeken',
    ratingUrl: '2/5',
    imageUrl: 'img/perry.png'
  }, {
    id: 4,
    name: 'Doner',
    ratingUrl: '1/5',
    imageUrl: 'img/mike.png'
  }];

  return {
    all: function() {
      console.log(restaurants);
      return restaurants;
    },
    remove: function(restaurant) {
      restaurants.splice(restaurants.indexOf(restaurant), 1);
    },
    get: function(restaurantId) {
      for (var i = 0; i < restaurants.length; i++) {
        if (restaurants[i].id === parseInt(restaurantId)) {
          return restaurants[i];
        }
      }
      return null;
    }
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
