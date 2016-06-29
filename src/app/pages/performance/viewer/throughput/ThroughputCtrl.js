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


      function DrawChart(throughput) {
        var layoutColors = baConfig.colors;
        var id = $element[0].getAttribute('id');

        console.log("Drawing chart");

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



      /*
       * This is ugly. I know and I agree. I will fix this later, after
       * I learn how to do this the correct way in this hideous
       * language
       */
      var requestData = "{\
  \"query\" : {\
    \"constant_score\" : { \
      \"filter\" : {\
        \"bool\" : {\
          \"must\" : [ \
            { \
              \"term\" : { \
                \"test_id\": \"" + test_id + "\" \
              } \
            },\
            { \
              \"term\" : { \
                \"version\": \"" + version + "\" \
              }\
            },\
            { \
              \"term\" : { \
                \"direction\": \"receiver\" \
              }\
            },\
            { \"range\" : { \
                \"creation\" : {\
                  \"gt\" : \"" + date + ".000||+" + start_time + "m\",\
                  \"lt\" : \"" + date + ".000||+" + start_time + "m+" + duration + "m\" \
                } \
              }\
            }\
          ]\
        }\
      }\
    }\
  },\
  \"aggs\" : { \
        \"throughput\" : { \
            \"date_histogram\" : { \
                \"field\" : \"creation\", \
                \"interval\" : \"1s\" \
            } \
        } \
    } \
}"

      //console.log("Request: " + requestData)

      // "{\"aggs\" : {\"throughput\" : {\"date_histogram\" : {\"field\" : \"creation\", \"interval\" : \"1s\" } } } }"
      console.log("Sending request to " + url)
      $http.post(url,requestData).then(function(response) {
            var throughput=response.data.aggregations.throughput.buckets
            DrawChart(throughput)
        }, function(response) {
            if (response.status == 404) {
              alert('Did not find any results for : ' + sut)
            } else {
              alert('Unable to contact server: ' + response.status)
            }

        });
    }



    $scope.tpInitFunction = function(key, test_id, version, date, start_time, duration) {
        console.log("Initializing ...")
        $scope.$watch('selected.active.test && selected.active.sut && selected.active.duration && selected.active.start_time', function() {

          console.log("Redrawing graph for " + key + " " + date + "/" + start_time + " - " + duration)

          $scope.updateChart(key, test_id, version, date, start_time, duration)
        });

        $scope.$watch('selected.active.start_time', function() {

          console.log("Redrawing graph for " + key + " " + date + "/" + $scope.selected.active.start_time.value + " - " + $scope.selected.active.duration.value)

          $scope.updateChart(key, test_id, version, date, $scope.selected.active.start_time.value, $scope.selected.active.duration.value)
        });

        $scope.$watch('selected.active.duration', function() {

          console.log("Redrawing graph for " + key + " " + date + "/" + $scope.selected.active.start_time.value + " - " + $scope.selected.active.duration.value)

          $scope.updateChart(key, test_id, version, date, $scope.selected.active.start_time.value, $scope.selected.active.duration.value)
        });
    }

    $scope.updateChart = DoChart;

  }

})();
