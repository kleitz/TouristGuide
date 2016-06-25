/**
 * Created by norlock on 6/23/16.
 */
(function () {
  'use strict';

  angular
    .module('tg.app')
    .controller('FlickrCtrl', FlickrCtrl);

  FlickrCtrl.$inject = ['$scope', 'FlickrService', 'MapService', '$ionicModal', '$localStorage', '$ionicScrollDelegate', '$ionicPopup'];

  /* @ngInject */
  function FlickrCtrl($scope, FlickrService, MapService, $ionicModal, $localStorage, $ionicScrollDelegate, $ionicPopup) {
    var isFavoritesPage = false, tempImages = []; // Wordt gebruikt als cache als de favorieten worden getoond.

    init();

    function init() {
      $scope.currentPage = 1;
      $scope.hasPreviousPage = false;

      getGallery()
    }

    function getGallery() {
      console.log(MapService.getLat() + ' ' + MapService.getLng());
      FlickrService.getGallery(MapService.getLat(), MapService.getLng(), $scope.currentPage).then(function (response) {
        console.log(response);
        $scope.lastPage = response.lastPage;
        $scope.images = response.images;
        $scope.hasNextPage = $scope.currentPage < $scope.lastPage;
        $scope.hasPreviousPage = 1 < $scope.currentPage;
      }, function () {
        $ionicPopup.alert({
          title: 'An error occurred',
          template: 'Can\'t retrieve images nearby'
        });
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
      $ionicScrollDelegate.scrollTop();
      isFavoritesPage = !isFavoritesPage;

      if(isFavoritesPage) {
        if($localStorage.images == undefined) {
          $localStorage.images = [];
        }
        tempImages = $scope.images;
        $scope.images = $localStorage.images;
      }
      else {
        $scope.images = tempImages;
        tempImages = [];
      }
    };

    $scope.nextPage = function () {
      $scope.currentPage++;
      getGallery();
    };

    $scope.previousPage = function () {
      $scope.currentPage--;
      getGallery();
    }
  }

})();

