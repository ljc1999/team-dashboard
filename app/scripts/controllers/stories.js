'use strict';

/**
 * @ngdoc function
 * @name easterdashApp.controller:StoriesCtrl
 * @description
 * # StoriesCtrl
 * Controller of the easterdashApp
 */
angular.module('easterdashApp').controller('StoriesCtrl', ['$scope', '$http', function ($scope, $http) {

  $http({
    method: 'GET',
    url: 'http://localhost:9000/stories.json'
  }).then(function(resp) {
    $scope.stories = resp.data;
  });

}]);
