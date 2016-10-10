/**
 * Alerts Controller
 */

angular
    .module('RDash')
    .controller('AlertsCtrl', ['$scope', '$http', AlertsCtrl]);

function AlertsCtrl($scope, $http) {
    $scope.chartArray = [];
    $scope.chartArray2 = [];


    function getTips(days) {
      var url = 'https://api.thingspeak.com/channels/152228/fields/1.json';
      return $http({
        method: 'GET',
        url: url,
        params: {'days': days}
      }).then(function successCallback(response) {
          return response.data;
            console.log(response.data);
      }, function errorCallback(response) {});
    }

    function getTipsCount(days) {
      var url = 'https://api.thingspeak.com/channels/152228/fields/2.json';
      return $http({
        method: 'GET',
        url: url,
        params: {'days': days}
      }).then(function successCallback(response) {
          return response.data;
            console.log(response.data);
      }, function errorCallback(response) {});
    }

    getTips(1).then(function (data) {
      $scope.tipCount = data.feeds.length;
    });

    getTips(7).then(function (data) {
      $scope.weekCount = data.feeds.length;
    });

    getTips(30).then(function (data) {
      $scope.monthCount = data.feeds.length;
    });


    $scope.highchartsConfig = {
       options: {
           chart: {
               type: 'line'
           },
           rangeSelector: {
               enabled: true
           },
           navigator: {
               enabled: true
           },
           xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
          },
          yAxis: {
            title: {
                text: 'Tip count'
            },
            min: 0
          }
       },
       series: [],
       title: {
           text: 'Tips'
       },
       loading: false
   }

   $scope.highchartsConfig2 = {
      options: {
          chart: {
              type: 'line'
          },
          rangeSelector: {
              enabled: true
          },
          navigator: {
              enabled: true
          },
          xAxis: {
           type: 'datetime',
           dateTimeLabelFormats: { // don't display the dummy year
               month: '%e. %b',
               year: '%b'
           },
           title: {
               text: 'Date'
           }
         },
         yAxis: {
           title: {
               text: 'No.of tips'
           },
           min: 0
         }
      },
      series: [],
      title: {
          text: 'Tips'
      },
      loading: false
  }

   getTips(30).then(function (data){
     for (var i = 0, len = data.feeds.length; i < len; i++) {
        var samArray = [];

        samArray.push(Date.parse(data.feeds[i].created_at));
        samArray.push(i+1);
        $scope.chartArray.push(samArray);
      }
      console.log($scope.chartArray);
      $scope.highchartsConfig.series.push({
        id: 1,
        name: 'Number of tips per day',
        data: $scope.chartArray
      });

   });

   getTipsCount(30).then(function (data) {
     console.log(data);
     for (var i = 0, len = data.feeds.length; i < len; i++) {
        var samArray = [];

        samArray.push(Date.parse(data.feeds[i].created_at));
        samArray.push(Number(data.feeds[i].field2));
        $scope.chartArray2.push(samArray);
      }
      console.log($scope.chartArray2);
      $scope.highchartsConfig2.series.push({
        id: 1,
        name: 'Number of tip count per day',
        data: $scope.chartArray2
      });
   });
}
