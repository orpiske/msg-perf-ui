/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance')
      .controller('NetworkCtrl', NetworkCtrl);

  /** @ngInject */
  function NetworkCtrl($scope, mptUIConfig, baConfig, $element, layoutPaths, $http) {
    var baConfig;
    var element;
    var layoutPaths;
    var http;

    if (this.baConfig == null) {
      // console.log("Setting the value for baConfig")
      this.baConfig = baConfig;
    }

    if (this.element == null) {
      // console.log("Setting the value for element")
      this.element = element;
    }

    if (this.layoutPaths == null) {
      // console.log("Setting the value for layoutPaths")
      this.layoutPaths = layoutPaths;
    }

    if (this.http == null) {
      // console.log("Setting the value for http")
      this.http = http;
    }

    if (this.mptUIConfig == null) {
      this.mptUIConfig = mptUIConfig;
    }

    function DoChart(key, test_id, version, date, start_time, duration) {


      function DrawChart(network) {
        if (network.length == 0) {
          $scope.plotted.snetwork = false;
        }
        else {
          $scope.plotted.snetwork = true;
        }

        var layoutColors = baConfig.colors;
        var id = $element[0].getAttribute('id');

        console.log("Drawing network chart");

        var lineChart = AmCharts.makeChart(id, {
          type: 'serial',
          theme: 'blur',
          color: layoutColors.defaultText,
          marginTop: 0,
          marginRight: 15,
          legend: {
            useGraphSettings: true,
            spacing: 30,
            valueText: "[[description]]"
          },
          dataProvider: network,
          valueAxes: [
            {
              axisAlpha: 0,
              position: 'left',
              gridAlpha: 0.5,
              gridColor: layoutColors.border,
              title: "Bytes",
            }
          ],
          graphs: [
            {
              id: 'g1',
              balloonText: 'sent at [[category]]: [[value]]',
              bullet: 'round',
              bulletSize: 8,
              lineColor: layoutColors.dangerLight,
              lineThickness: 1,
              negativeLineColor: layoutColors.warningLight,
              type: 'smoothedLine',
              title: "Bytes sent",
              valueField: 'tx'
            },
            {
              id: 'g2',
              balloonText: 'received at [[category]]: [[value]] ',
              bullet: 'round',
              bulletSize: 8,
              lineColor: layoutColors.warning,
              lineThickness: 1,
              negativeLineColor: layoutColors.warning,
              type: 'smoothedLine',
              title: 'Bytes received',
              valueField: 'rx'
            }
          ],
          // chartScrollbar: {
          //   graph: 'g1',
          //   gridAlpha: 0,
          //   color: layoutColors.defaultText,
          //   scrollbarHeight: 55,
          //   backgroundAlpha: 0,
          //   selectedBackgroundAlpha: 0.05,
          //   selectedBackgroundColor: layoutColors.defaultText,
          //   graphFillAlpha: 0,
          //   autoGridCount: true,
          //   selectedGraphFillAlpha: 0,
          //   graphLineAlpha: 0.2,
          //   selectedGraphLineColor: layoutColors.defaultText,
          //   selectedGraphLineAlpha: 1
          // },
          chartCursor: {
            categoryBalloonDateFormat: 'HH:NN:SS',
            cursorAlpha: 0,
            valueLineEnabled: true,
            valueLineBalloonEnabled: true,
            valueLineAlpha: 0.5,
            fullWidth: true
          },
          dataDateFormat: 'YYYY-MM-DD JJ:NN:SS',
          categoryField: 'ts',
          categoryAxis: {
            minPeriod: 'ss',
            position: 'top',
            parseDates: true,
            minorGridAlpha: 0.1,
            minorGridEnabled: true,
            gridAlpha: 0.5,
            gridColor: layoutColors.border
          },
          export: {
            enabled: true,
            position: 'bottom-right'
          },
          creditsPosition: 'bottom-right',
          pathToImages: layoutPaths.images.amChart
        });

        lineChart.addListener('rendered', zoomChart);
        if (lineChart.zoomChart) {
          lineChart.zoomChart();
        }

        function zoomChart() {
          lineChart.zoomToIndexes(Math.round(lineChart.dataProvider.length * 0.4), Math.round(lineChart.dataProvider.length * 0.55));
        }
      }

      var url = mptUIConfig.apiUrl + "/" + key + '/sender-network/_search';

      console.log("Sending get request to " + url)
      $http.get(url).then(function(response) {
            var reply = response.data.hits.hits;
            var networkData = new Array();

            /**
             * We have to transform the reply, because amCharts cannot access
             * the some inner values
             */
            for (var idx in reply) {
              networkData[idx] = {
                "ts": reply[idx]._source.ts,
                "tx": reply[idx]._source.tx,
                "rx": reply[idx]._source.rx,
               } ;
            }

            DrawChart(networkData)
        }, function(response) {
            if (response.status == 404) {
              console.log('Did not find any results for : ' + key)
            } else {
              console.log('Unsuccessfull server response. Error code: '
                + response.status)
            }

        });
    }



    $scope.tpInitNetwork = function(key, test_id, version, date, start_time, duration) {
        console.log("Initializing network")

        var tpWatchGroup = ['selected.active.sut', 'selected.active.test', 'selected.active.start_time', 'selected.active.duration']

        $scope.$watchGroup(tpWatchGroup, function() {

          console.log("SUT, test, start time or duration changed -> Redrawing network graph for " +
              $scope.selected.active.test.test_req_url + " " +
              $scope.selected.active.test.test_start_time +
              "/" + $scope.selected.active.start_time.value + " - " +
              $scope.selected.active.duration.value)

          $scope.updateNetworkChart(
              $scope.selected.active.test.test_req_url,
              $scope.selected.active.test.test_id,
              $scope.selected.active.sut.sut_version,
              $scope.selected.active.test.test_start_time,
              $scope.selected.active.start_time.value,
              $scope.selected.active.duration.value)
        });
    }

    $scope.updateNetworkChart = DoChart;

  }

})();
