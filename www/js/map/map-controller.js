/**
 *
 */
/**
 * Created by norlock on 5/15/16.
 */
(function () {
  'use strict';

  angular
    .module('tg.app')
    .controller('MapCtrl', MapCtrl);

  MapCtrl.$inject = ['MapService' ];

  function MapCtrl(MapService) {
    MapService.loadMap();
  }
})();
