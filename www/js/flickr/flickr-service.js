/**
 * Created by norlock on 6/23/16.
 */
(function () {
  'use strict';

  angular
    .module('tg.app')
    .service('FlickrService', FlickrService);

  FlickrService.$inject = ['$http'];

  /* @ngInject */
  function FlickrService($http) {
    this.getGallery = getGallery;

    var url = '';
    var photoArray = [];
    var apikey = 'api_key=67d7e2fcb565d3999af0b66175a9e2d6',
      latitude = '',
      longitude = '',
      pageCount = '',
      pageNumberStr = '',
      pageNumberInt = 1,
      lastPageNumberInt = 0,
      format = '',
      jsonCallback = '';

    function getGallery(lat, lng) {
      latitude = 'lat=' + lat;
      longitude = 'lon=' + lng;
      pageCount = 'per_page=' + 20;
      pageNumberStr = 'page=' + pageNumberInt;
      format = 'format=json';
      jsonCallback = 'nojsoncallback=1';

      urlBuilderSearch([apikey, latitude, longitude, pageCount, pageNumberStr, format, jsonCallback]);
      console.log(url);

      return $http.get(url, null).then(function (response) {
        photoArray = setImageUrls(response.data.photos.photo);
        lastPageNumberInt = response.data.photos.pages;
        console.log(response);
        return photoArray;
      }, function (response) {
        console.log(response);
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


