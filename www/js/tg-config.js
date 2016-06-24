/**
 * Created by norlock on 5/15/16.
 */
(function () {
  'use strict';

  angular.module('tg')
    .run(run)
    .config(config);

  run.$inject = ['$ionicPlatform'];

  /* @ngInject */
  function run($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)

      if( window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard ) {
        // Check reference to avoid runtime error on windows phone
        if(! (ionic.Platform.isWindowsPhone() || (ionic.Platform.platform() == 'win64') || ionic.Platform.platform() == 'edge' )) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar( true );
        }
        cordova.plugins.Keyboard.disableScroll( true );
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  /* @ngInject */
  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.map', {
        url: '/map',
        views: {
          'tab-map': {
            templateUrl: 'templates/tab-map.html',
            controller: 'MapCtrl'
          }
        }
      })

      .state('tab.restaurants', {
        url: '/restaurants',
        views: {
          'tab-restaurants': {
            templateUrl: 'templates/tab-restaurants.html',
            controller: 'YelpCtrl'
          }
        }
      })

      .state('tab.restaurants-detail', {
        url: '/restaurants/:id',
        views: {
          'tab-restaurants': {
            templateUrl: 'templates/restaurant-detail.html',
            controller: 'YelpCtrl'
          }
        }
      })

      .state('tab.gallery', {
        url: '/gallery',
        views: {
          'tab-gallery': {
            templateUrl: 'templates/tab-gallery.html',
            controller: 'FlickrCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise('/tab/map');
  }

})();
