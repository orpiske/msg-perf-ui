/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance')
      .controller('LatencyCtrl', LatencyCtrl);

  /** @ngInject */
  function LatencyCtrl($scope, mptUIConfig, baConfig, $element, layoutPaths, $http) {
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


      function DrawChart(stats) {
        if (stats.length == 0) {
          $scope.plotted.rlatency = false;
        }
        else {
          $scope.plotted.rlatency = true;
        }

        var layoutColors = baConfig.colors;
        var id = $element[0].getAttribute('id');

        console.log("Drawing latency chart " + stats);

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
          dataProvider: stats,
          valueAxes: [
            {
              axisAlpha: 0,
              position: 'left',
              gridAlpha: 0.5,
              gridColor: layoutColors.border,
              title: "Average Latency (in milliseconds)",
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
              valueField: 'average',
              title: 'Average latency'
            },
            {
              id: 'g2',
              balloonText: '[[value]]',
              bullet: 'round',
              bulletSize: 8,
              lineColor: layoutColors.successLight,
              lineThickness: 1,
              negativeLineColor: layoutColors.warning,
              type: 'smoothedLine',
              valueField: 'minimum',
              title: 'Minimum latency'
            },
            {
              id: 'g3',
              balloonText: '[[value]]',
              bullet: 'round',
              bulletSize: 8,
              lineColor: layoutColors.warning,
              lineThickness: 1,
              negativeLineColor: layoutColors.warning,
              type: 'smoothedLine',
              valueField: 'maximum',
              title: 'Maximum latency'
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
            title: "Time",
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

      var url = mptUIConfig.apiUrl + "/" + key + '/mpt-receiver-latency/_search?size=0';



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
        \"latency\" : { \
            \"date_histogram\" : { \
                \"field\" : \"creation\", \
                \"interval\" : \"1s\" \
            },\
            \"aggs\" : {\
                \"stats_latency\" : { \
                    \"stats\" : { \
                        \"field\" : \"latency\" \
                      } \
                    }\
              } \
        } \
    } \
}"

      console.log("Sending request to " + url)
      $http.post(url,requestData).then(function(response) {
            var reply=response.data.aggregations.latency.buckets
            var latencyData = new Array();

            /**
             * We have to transform the reply, because amCharts cannot access
             * the inner avg_latency.value
             */
            for (var idx in reply) {
              latencyData[idx] = {
                "key_as_string": reply[idx].key_as_string,
								"minimum": reply[idx].stats_latency.min,
								"maximum": reply[idx].stats_latency.max,
                "average": reply[idx].stats_latency.avg,
								"count": reply[idx].stats_latency.sum,
               } ;
            }

            DrawChart(latencyData)
        }, function(response) {
            if (response.status == 404) {
              console.log('Did not find any results for : ' + key)
            } else {
              console.log('Unsuccessfull server response. Error code: '
                + response.status)
            }

        });
    }



    $scope.tpInitLatency = function(key, test_id, version, date, start_time, duration) {
        console.log("Initializing latency")

        var tpWatchGroup = ['selected.active.sut', 'selected.active.test', 'selected.active.start_time', 'selected.active.duration']

        $scope.$watchGroup(tpWatchGroup, function() {

          console.log("SUT, test, start time or duration changed -> Redrawing latency graph for " +
              $scope.selected.active.test.test_req_url + " " +
              $scope.selected.active.test.test_start_time +
              "/" + $scope.selected.active.start_time.value + " - " +
              $scope.selected.active.duration.value)

          $scope.updateLatencyChart(
              $scope.selected.active.test.test_req_url,
              $scope.selected.active.test.test_id,
              $scope.selected.active.sut.sut_version,
              $scope.selected.active.test.test_start_time,
              $scope.selected.active.start_time.value,
              $scope.selected.active.duration.value)
        });
    }

    $scope.updateLatencyChart = DoChart;

  }

})();
