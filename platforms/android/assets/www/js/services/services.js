angular.module('starter.services', [])

.factory('Restaurants', function() {
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
