/**
 * Created by norlock on 6/23/16.
 */
(function () {
  'use strict';

  angular
    .module('tg.app')
    .controller('FavoritesCtrl', FavoritesCtrl);

  FavoritesCtrl.$inject = ['$scope', '$localStorage'];

  /* @ngInject */
  function FavoritesCtrl($scope, $localStorage) {

    init();

    function init() {
      // Lokale opslag zetten als die nog niet bestaat
      if($localStorage.favorites == undefined) {
        $localStorage.favorites = [];
      }
      console.log($localStorage.favorites);
      $scope.restaurants = $localStorage.favorites;
    }
  }

})();

