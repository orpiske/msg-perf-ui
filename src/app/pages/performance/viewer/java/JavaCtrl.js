/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance')
      .controller('JavaCtrl', JavaCtrl);

  /** @ngInject */
  function JavaCtrl($scope, mptUIConfig, baConfig, $element, layoutPaths, $http) {
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


			function DrawJVMChart(jvm, name, elemid, field1, field2, max) {
        if (jvm.length == 0) {
          $scope.plotted.eden = false;
        }
        else {
          $scope.plotted.eden = true;
        }

        var layoutColors = baConfig.colors;
        var id = document.getElementById(elemid);

        console.log("Drawing " + name + " chart");

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
          dataProvider: jvm,
          valueAxes: [
            {
              axisAlpha: 0,
              stackType: "regular",
              position: 'left',
              gridAlpha: 0.5,
              gridColor: layoutColors.border,
              title: "Megabytes",
            }
          ],
          graphs: [
            {
              id: 'g1',
              balloonText: '[[value]]',
              bullet: 'round',
              bulletSize: 8,
              lineColor: layoutColors.dangerLight,
              lineThickness: 1,
              negativeLineColor: layoutColors.warningLight,
              type: 'smoothedLine',
              title: name + ' Used (Max ' + max + ' )',
              valueField: field1
            },
            {
              id: 'g2',
              balloonText: '[[value]]',
              bullet: 'round',
              bulletSize: 8,
              lineColor: layoutColors.warning,
              lineThickness: 1,
              negativeLineColor: layoutColors.warning,
              type: 'smoothedLine',
              title: name + ' Committed (Max ' + max + ' )',
              valueField: field2
            }
          ],
          chartCursor: {
            categoryBalloonDateFormat: 'JJ:NN:SS',
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
            equalSpacing: true,
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

			function DrawMemoryChart(jvm, name, elemid, field1, field2, field3) {
        var layoutColors = baConfig.colors;
        var id = document.getElementById(elemid);

        console.log("Drawing " + name + " chart");

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
          dataProvider: jvm,
          valueAxes: [
            {
              axisAlpha: 0,
              stackType: "regular",
              position: 'left',
              gridAlpha: 0.5,
              gridColor: layoutColors.border,
              title: "Megabytes",
            }
          ],
          graphs: [
            {
              id: 'g1',
              balloonText: '[[value]]',
              bullet: 'round',
              bulletSize: 8,
              lineColor: layoutColors.dangerLight,
              lineThickness: 1,
              negativeLineColor: layoutColors.warningLight,
              type: 'smoothedLine',
              title: "Free Physical Memory",
              valueField: field1
            },
            {
              id: 'g2',
              balloonText: '[[value]]',
              bullet: 'round',
              bulletSize: 8,
              lineColor: layoutColors.warning,
              lineThickness: 1,
              negativeLineColor: layoutColors.warning,
              type: 'smoothedLine',
              title: "Free Swap Memory",
              valueField: field2
            },
            {
              id: 'g3',
              balloonText: '[[value]]',
              bullet: 'round',
              bulletSize: 8,
              lineColor: layoutColors.darkWarning,
              lineThickness: 1,
              negativeLineColor: layoutColors.warning,
              type: 'smoothedLine',
              title: "Used Swap Memory",
              valueField: field3
            }
          ],
          chartCursor: {
            categoryBalloonDateFormat: 'JJ:NN:SS',
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
            equalSpacing: true,
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

			var maxSize = (duration * 60) / 10
      var url = mptUIConfig.apiUrl + "/" + key
				+ '/broker-java/_search?size=' + maxSize;

			var requestData = "{\
			\"query\" : {\
				\"constant_score\" : { \
					\"filter\" : {\
							\"range\" : { \
									\"ts\" : {\
										\"gt\" : \"" + date + "||+" + start_time + "m-1s\",\
										\"lt\" : \"" + date + "||+" + start_time + "m+" + duration + "m\" \
									} \
								}\
							}\
						}\
					},\
			\"sort\" : [ {\"ts\" : {\"order\" : \"asc\"}} ]\
		}"

      console.log("Sending get request to " + url)
      $http.post(url, requestData).then(function(response) {
            var reply = response.data.hits.hits;
            var jvmData = new Array();

						var osMemData = new Array();

            /**
             * We have to transform the reply, because amCharts cannot access
             * the some inner values
             */
            for (var idx in reply) {
              jvmData[idx] = {
								"ts": reply[idx]._source.ts,
                "eden_used": reply[idx]._source.eden_used,
                "eden_max": reply[idx]._source.eden_max,
                "eden_cmm": reply[idx]._source.eden_cmm,
								"svv_used": reply[idx]._source.svv_used,
								"svv_max": reply[idx]._source.svv_max,
								"svv_cmm": reply[idx]._source.svv_cmm,
								"tnd_used": reply[idx]._source.tnd_used,
								"tnd_max": reply[idx]._source.tnd_max,
								"tnd_cmm": reply[idx]._source.tnd_cmm,
								"pm_used": reply[idx]._source.pm_used,
								"pm_max": reply[idx]._source.pm_max,
								"pm_cmm": reply[idx]._source.pm_cmm,
               };

							 osMemData[idx] = {
								 	"ts": reply[idx]._source.ts,
									"free_mem": reply[idx]._source.free_mem,
                  "swap_free": reply[idx]._source.swap_free,
									"swap_cmm": reply[idx]._source.swap_cmm,
									"open_fds": reply[idx]._source.open_fds,
									"free_fds": reply[idx]._source.free_fds,
							 }
            }

						DrawJVMChart(jvmData, "Eden", "edenChart", "eden_used", "eden_cmm",
							jvmData[0].eden_max);
						DrawJVMChart(jvmData, "Survivor", "survivorChart", "svv_used", "svv_cmm",
								jvmData[0].svv_used);
						DrawJVMChart(jvmData, "Tenured", "tenuredChart", "tnd_used", "tnd_cmm",
								jvmData[0].tnd_used);
						DrawJVMChart(jvmData, "PermGen/Metaspace", "pmChart", "pm_used", "pm_cmm",
								jvmData[0].pm_max);

						DrawMemoryChart(osMemData, "OS Memory", "sysMemChart", "free_mem",
									"swap_free", "swap_cmm");
        }, function(response) {
            if (response.status == 404) {
              console.log('Did not find any results for : ' + key)
            } else {
              console.log('Unsuccessfull server response. Error code: '
                + response.status)
            }

        });
    }



    $scope.tpInitJava = function(key, test_id, version, date, start_time, duration) {
        console.log("Initializing jvm")

        var tpWatchGroup = ['selected.active.sut', 'selected.active.test', 'selected.active.start_time', 'selected.active.duration']

        $scope.$watchGroup(tpWatchGroup, function() {

          console.log("SUT, test, start time or duration changed -> Redrawing jvm graph for " +
              $scope.selected.active.test.test_req_url + " " +
              $scope.selected.active.test.test_start_time +
              "/" + $scope.selected.active.start_time.value + " - " +
              $scope.selected.active.duration.value)

          $scope.updateJvmChart(
              $scope.selected.active.test.test_req_url,
              $scope.selected.active.test.test_id,
              $scope.selected.active.sut.sut_version,
              $scope.selected.active.test.test_start_time,
              $scope.selected.active.start_time.value,
              $scope.selected.active.duration.value)
        });


    }

    $scope.updateJvmChart = DoChart;

  }

})();
