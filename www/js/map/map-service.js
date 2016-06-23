/**
 * Created by norlock on 5/15/16.
 */
(function () {
  'use strict';

  angular
    .module('tg.app')
    .service('MapService', MapService);

  //MapService.$inject = [''];

  /* @ngInject */
  function MapService() {
    this.getMap = getMap;
    this.loadMap = loadMap;
    var map = {};

    function loadMap() {
      map = L.map('mapid').setView([52.2194, 6.8870], 15);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 16,
        id: 'norlock.pi27ck85',
        accessToken: 'pk.eyJ1Ijoibm9ybG9jayIsImEiOiJjaW1ld2RoZ20wMDQwdmptM3E1OXd6cHQyIn0.IThbBD1fZ4jfL7qfQ-XfLw'
      }).addTo(map);
      map.on('locationfound', onLocationFound);
      map.locate({setView: true, maxZoom: 16});
    }

    function getMap() {
      return map;
    }

    function onLocationFound(e) {
      var radius = e.accuracy / 2;

      L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

      L.circle(e.latlng, radius).addTo(map);
    }

  }

})();

