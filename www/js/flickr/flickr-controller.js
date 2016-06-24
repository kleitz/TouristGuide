/**
 * Created by norlock on 6/23/16.
 */
(function () {
  'use strict';

  angular
    .module('tg.app')
    .controller('FlickrCtrl', FlickrCtrl);

  FlickrCtrl.$inject = ['$scope', 'FlickrService', 'MapService', '$ionicModal', '$localStorage'];

  /* @ngInject */
  function FlickrCtrl($scope, FlickrService, MapService, $ionicModal, $localStorage) {
    var lat, lng = {};
    var isFavoritesPage = false;
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

    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function(index) {
      if($localStorage.images == undefined) $localStorage.images = [];

      var selectedImg = $scope.images[index];
      selectedImg.favorite = {}; // zet favorieten waarden
      selectedImg.favorite.bool = false;
      selectedImg.favorite.text = "Favorite";
      for(var i = 0; i < $localStorage.images.length; i++) {
        var image = $localStorage.images[i];
        if(image.id == selectedImg.id) {
          selectedImg.favorite.bool = true;
          selectedImg.favorite.text = "Unfavorite";
        }
      }

      $scope.selectedImage = selectedImg;
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.addRemoveFavorite = function () {
      // images opslaan als favorite TODO verwijderen als niet goed is

      var img = $scope.selectedImage;
      img.favorite.bool = !img.favorite.bool;

      if(img.favorite.bool) {
        $scope.selectedImage.favorite.text = 'Unfavorite';
        $localStorage.images.push(img);
      } else {
        var index = $localStorage.images.indexOf(img);
        if (index > -1) {
          $localStorage.images.splice(index, 1);
        }
        $scope.selectedImage.favorite.text = 'Favorite';
      }
      $scope.selectedImage = img;
      console.log($localStorage.images);
    };

    $scope.loadFavorites = function () {
      console.log('laad favorieten');
      if($localStorage.images == undefined) {
        $localStorage.images = [];
      }
      console.log($localStorage.images);
      $scope.images = $localStorage.images;
    }

  }

})();

