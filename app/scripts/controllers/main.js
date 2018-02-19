'use strict';

/**
 * @ngdoc function
 * @name easterdashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the easterdashApp
 */
angular.module('easterdashApp').controller('MainCtrl', ['$scope', 'teamDb', '$http', function ($scope, teamDb, $http) {
    $http({
      method: 'GET',
      url: 'http://localhost:9000/stories.json'
    }).then(function(resp) {
      $scope.stories = resp.data.missions;
    });

    var dbError = function(response) {
        $scope.loading = false;
        $scope.response = response;
    };
    var buildGraphs = function() {
        $scope.teamTotals = {labels: [], data: [[]]};
        $scope.highChart = {
      		xAxis: [{
            			type: 'datetime',
      			title: 'Date/Time',
      			tickInterval: 3600000,
      			breaks: [{
      			            from: 1491841800000,
      			            to: 1491901200000,
      			            breakSize: 1
              		},{
      			            from: 1491928200000,
      			            to: 1491987600000,
      			            breakSize: 1
              		},{
      			            from: 1492014600000,
      			            to:  1492074000000,
      			            breakSize: 1
              		}]
          		}],
      		title: {
      		      	text: 'The rise and fall of teams'
      		},
      		credits: {
      		      	enabled: false
          		},
      		useHighStocks: true,
      		series: []
      	};

        $scope.teams.forEach(function(team) {
            var series = {name: team.name, data:[]};
            $scope.teamTotals.labels.push(team.name);
            $scope.teamTotals.data[0].push(team.balance); // The chart allows for multiple plots, so we needd to nest
            if (team.transactions) {
                team.transactions.forEach(function(transaction) {
                    series.data.push([transaction.time, transaction.balance]);
                });
                $scope.highChart.series.push(series);
            }
        });
        $scope.graphsReady = true;
    };

    var buildTables = function() {
      for(var i = 0; i <= $scope.teams.length; i++) {
        var transactions = $scope.teams[i].transactions;
        // loop over the transactions
        var highestTrans = { title: 'Story 0' };

        // assumes an initial invesment
        for (var j = 1; j <= transactions.length; j++) {

          // get the number from each, saving the current highest locally
          try {
            if ( parseInt(transactions[j].title.substr(6)) > parseInt(highestTrans.title.substr(6))) {
              // save the highest trans
              highestTrans.title = transactions[j].title;
            }
          } catch (e) {}
        }
        $scope.teams[i].currentStory = highestTrans.title;
      }
    };

    $scope.teams = [];
    $scope.graphsReady = false;
    $scope.debug = false;

    teamDb.get('teams')
        .then(function(response) {
            $scope.response = response;
            if (response.data) {
                $scope.loading = false;
                $scope.teams = response.data;
                buildGraphs();
                buildTables();
            } else {
                dbError(response);
            }
        })
        .catch(dbError);
}]);
