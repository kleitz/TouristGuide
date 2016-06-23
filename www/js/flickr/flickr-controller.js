/**
 * Created by norlock on 6/23/16.
 */
(function () {
  'use strict';

  angular
    .module('tg.app')
    .controller('FlickrCtrl', FlickrCtrl);

  FlickrCtrl.$inject = ['$scope', 'FlickrService', 'MapService'];

  /* @ngInject */
  function FlickrCtrl($scope, FlickrService, MapService) {
    var lat, lng = {};
    init();

    function init() {
      var map = MapService.getMap();
      if(map._lastCenter == undefined) { // zet enschede als standaard
        lat = 52.2215;
        lng = 6.8937;
      }
      else { // zet locatie
        lat = map._lastCenter.lat;
        lng = map._lastCenter.lng;
      }

      FlickrService.getGallery(lat, lng).then(function (response) {
        $scope.images = response;
        console.log(response);
      }, function (response) {

      });
    }

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.showImage = function(index) {
      console.log(index);
      $scope.imageSrc = $scope.images[index].imageUrl;

      $scope.openModal();
    };
  }

})();

