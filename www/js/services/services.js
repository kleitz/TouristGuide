angular.module('starter.services', [])

.factory('Restaurants', function($http, YelpApiUrl) {
  // Might use a resource here that returns a JSON array

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
      var httpMethod = 'GET';
      var parameters = {
            cll: 52.2215 + ',' + 6.8937,
            oauth_consumer_key: '6CCgnRLENZ-dCYvYZ-MTsA',
            oauth_token: 'fglTkJXMd91K1kWKdM3qowiM9FVj7yqk',
            oauth_signature_method: 'HMAC-SHA1',
            oauth_timestamp: new Date().getTime(),
            oauth_nonce: randomString(16),
            oauth_version: '1.0',
            term: 'food',
            limit: 20
          };
      var consumerSecret = 'CA-7yCPviP6GWQa8KM-qXxLWHXE';
      var tokenSecret = '6waG5OwxOSF5iAUVykmyGgDTgWM';

      parameters['oauth_signature'] = oauthSignature.generate(httpMethod, 'http://api.yelp.com/v2/search', parameters, consumerSecret, tokenSecret, {encodeSignature : false});
      console.log(parameters);
      // Simple GET request example:
      $http.get(
        'http://localhost:8100/v2/search',
        { params : parameters})
          .then(function(response) {
            console.log(response);
          }, function(error) {
            console.log(error);
          });

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

var randomString = function(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
