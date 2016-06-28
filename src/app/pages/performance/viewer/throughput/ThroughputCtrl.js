/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance')
      .controller('ThroughputCtrl', ThroughputCtrl);

  /** @ngInject */
  function ThroughputCtrl($scope, mptUIConfig, baConfig, $element, layoutPaths, $http) {
    var baConfig;
    var element;
    var layoutPaths;
    var http;

    if (this.baConfig == null) {
      console.log("Setting the value for baConfig")
      this.baConfig = baConfig;
      console.log("Done")

    }

    if (this.element == null) {
      console.log("Setting the value for element")
      this.element = element;
      console.log("Done")
    }

    if (this.layoutPaths == null) {
      console.log("Setting the value for layoutPaths")
      this.layoutPaths = layoutPaths;
      console.log("Done")
    }

    if (this.http == null) {
      console.log("Setting the value for http")
      this.http = http;
      console.log("Done")
    }

    if (this.mptUIConfig == null) {
      this.mptUIConfig = mptUIConfig;
    }

    function DoChart(sut, key, version) {
      // var queryField = element(by.model('$dataField'));

      // alert('Value = ' + $scope.date.initial)

      function DrawChart(sut, throughput, version) {
        var layoutColors = baConfig.colors;
        var id = $element[0].getAttribute('id');

        console.log("Througput (2)");
        console.log("BA Config: " + baConfig);
        console.log("Selected SUT: " + sut);

        var lineChart = AmCharts.makeChart(id, {
          type: 'serial',
          theme: 'blur',
          color: layoutColors.defaultText,
          marginTop: 0,
          marginRight: 15,
          dataProvider: throughput,
          valueAxes: [
            {
              axisAlpha: 0,
              position: 'left',
              gridAlpha: 0.5,
              gridColor: layoutColors.border,
            }
          ],
          graphs: [
            {
              id: 'g1',
              balloonText: '[[value]]',
              bullet: 'round',
              bulletSize: 8,
              lineColor: layoutColors.danger,
              lineThickness: 1,
              negativeLineColor: layoutColors.warning,
              type: 'smoothedLine',
              valueField: 'doc_count'
            }
          ],
          chartScrollbar: {
            graph: 'g1',
            gridAlpha: 0,
            color: layoutColors.defaultText,
            scrollbarHeight: 55,
            backgroundAlpha: 0,
            selectedBackgroundAlpha: 0.05,
            selectedBackgroundColor: layoutColors.defaultText,
            graphFillAlpha: 0,
            autoGridCount: true,
            selectedGraphFillAlpha: 0,
            graphLineAlpha: 0.2,
            selectedGraphLineColor: layoutColors.defaultText,
            selectedGraphLineAlpha: 1
          },
          chartCursor: {
            categoryBalloonDateFormat: 'YYYY-MM-DD HH:NN:SS.QQQ',
            cursorAlpha: 0,
            valueLineEnabled: true,
            valueLineBalloonEnabled: true,
            valueLineAlpha: 0.5,
            fullWidth: true
          },
          dataDateFormat: 'YYYY-MM-DD HH:NN:SS.QQQ',
          categoryField: 'key_as_string',
          categoryAxis: {
            minPeriod: 'ss',
            parseDates: true,
            minorGridAlpha: 0.1,
            minorGridEnabled: true,
            gridAlpha: 0.5,
            gridColor: layoutColors.border,
          },
          export: {
            enabled: true
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

      var url = mptUIConfig.apiUrl + "/" + key + '/latency/_search?size=0&version=' + version;

      console.log("Sending request to " + url)
      $http.post(url,
          "{\"aggs\" : {\"throughput\" : {\"date_histogram\" : {\"field\" : \"creation\", \"interval\" : \"1s\" } } } }"
        ).then(function(response) {
            var throughput=response.data.aggregations.throughput.buckets
            DrawChart(sut, throughput)
        }, function(response) {
            if (response.status == 404) {
              alert('Did not find any results for : ' + sut)
            } else {
              alert('Unable to contact server: ' + response)
            }

        });
    }

    $scope.updateChart = DoChart;

    $scope.$watch('selectedSut', function() {
      console.log("Redrawing grapth with selected SUT = "
          + $scope.selectedSut.sut + "(" + $scope.selectedSut.key + ")")

      DoChart($scope.selectedSut.sut, $scope.selectedSut.key,
        $scope.selectedSut.version)

     });

  }

})();
