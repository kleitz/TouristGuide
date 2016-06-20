(function () {
  'use strict';

  angular
    .module('tg.map')
    .service('YelpService', YelpService);

  YelpService.$inject = ['$http'];

  /* @ngInject */
  function YelpService($http) {
    this.getRestaurants = getRestaurants;


    function getRestaurants(lat, lng) {
      
      console.log('Lat: ' + lat + ' long: ' + lng);

      var method = 'GET';
      var url = 'http://api.yelp.com/v2/search';
      var params = {
        callback: 'angular.callbacks._0',
        ll:  52.2215 + ',' + 6.8937,
        oauth_consumer_key: '6CCgnRLENZ-dCYvYZ-MTsA', //Consumer Key
        oauth_token: 'y6AH2jAhRqG3Bf35LAiywQxaEbraimUh', //Token
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: new Date().getTime(),
        oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
        term: 'food'
      };
      var consumerSecret = 'CA-7yCPviP6GWQa8KM-qXxLWHXE'; //Consumer Secret
      var tokenSecret = 'FASCXvz3fpA5WtpM7y9F8Y0V7sY'; //Token Secret
      var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});

      params['oauth_signature'] = signature;
      return $http.jsonp(url, {params: params});
    }
  }


})();

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

