/**
 * Created by norlock on 6/23/16.
 */
(function () {
  'use strict';

  angular
    .module('tg.app')
    .service('FlickrService', FlickrService);

  FlickrService.$inject = ['$http', '$q'];

  /* @ngInject */
  function FlickrService($http, $q) {
    this.getGallery = getGallery;

    var url = '';
    var result = {};
    var format = 'format=json';
    var jsonCallback = 'nojsoncallback=1';
    var apikey = 'api_key=67d7e2fcb565d3999af0b66175a9e2d6';

    function getGallery(lat, lng, pageNumber) {
      var latitude = 'lat=' + lat;
      var longitude = 'lon=' + lng;
      var pageCount = 'per_page=' + 24;
      var pageNumberStr = 'page=' + pageNumber;
      var deferred = $q.defer();

      urlBuilderSearch([apikey, latitude, longitude, pageCount, pageNumberStr, format, jsonCallback]);
      console.log(url);

      return $http.get(url, null).then(function (response) {
        console.log(response);
        if(response.data.photos.photo == undefined) {
          deferred.reject();
          return deferred.promise;
        }
        result.images = setImageUrls(response.data.photos.photo);
        result.lastPage = response.data.photos.pages;
        return result;
      })
    }

    // zet de image urls
    function setImageUrls(photos) {
      for(var i = 0; i < photos.length; i++) {
        var photo = photos[i];
        photo.imageUrl = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server
         + '/' + photo.id + '_' + photo.secret + '.jpg'; //+ photo.owner + '/' + photo.id;
      }
      return photos;
    }

    // maak de url voor de flickr search call
    function urlBuilderSearch(urlStrArray) {
      url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
      for(var i = 0; i < urlStrArray.length; i++) {
        url = url + '&' + urlStrArray[i];
      }
    }
  }

})();


