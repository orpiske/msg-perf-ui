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


      function DrawEdenChart(jvm) {
        if (jvm.length == 0) {
          $scope.plotted.eden = false;
        }
        else {
          $scope.plotted.eden = true;
        }

        var layoutColors = baConfig.colors;
        var id = document.getElementById('edenChart');

        console.log("Drawing Eden chart");

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
              title: "Eden Initial",
              valueField: 'eden_ini'
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
              title: 'Eden Committed',
              valueField: 'eden_cmm'
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
              title: 'Eden Max',
              valueField: 'eden_max'
            }
          ],
          chartCursor: {
            categoryBalloonDateFormat: 'HH:NN:SS',
            cursorAlpha: 0,
            valueLineEnabled: true,
            valueLineBalloonEnabled: true,
            valueLineAlpha: 0.5,
            fullWidth: true
          },
          dataDateFormat: 'YYYY-MM-DD HH:NN:SS',
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

			function DrawSurvivorChart(jvm) {
				if (jvm.length == 0) {
					$scope.plotted.survivor = false;
				}
				else {
					$scope.plotted.survivor = true;
				}

				var layoutColors = baConfig.colors;
				var id = document.getElementById('survivorChart');

				console.log("Drawing survivor chart for " + id);

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
							title: "Survivor Initial",
							valueField: 'svv_ini'
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
							title: 'Survivor Committed',
							valueField: 'svv_cmm'
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
							title: 'Survivor Max',
							valueField: 'svv_max'
						},
						{
							id: 'g1',
							balloonText: '[[value]]',
							bullet: 'round',
							bulletSize: 8,
							lineColor: layoutColors.dangerLight,
							lineThickness: 1,
							negativeLineColor: layoutColors.warningLight,
							type: 'smoothedLine',
							title: "Survivor used",
							valueField: 'svv_used'
						}
					],
					chartCursor: {
						categoryBalloonDateFormat: 'HH:NN:SS',
						cursorAlpha: 0,
						valueLineEnabled: true,
						valueLineBalloonEnabled: true,
						valueLineAlpha: 0.5,
						fullWidth: true
					},
					dataDateFormat: 'YYYY-MM-DD HH:NN:SS',
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


      var url = mptUIConfig.apiUrl + "/" + key + '/broker-java/_search';

      console.log("Sending get request to " + url)
      $http.get(url).then(function(response) {
            var reply = response.data.hits.hits;
            var jvmData = new Array();

            /**
             * We have to transform the reply, because amCharts cannot access
             * the some inner values
             */
            for (var idx in reply) {
              jvmData[idx] = {
								"ts": reply[idx]._source.ts,
                "eden_ini": reply[idx]._source.eden_ini,
                "eden_max": reply[idx]._source.eden_max,
                "eden_cmm": reply[idx]._source.eden_cmm,
								"svv_ini": reply[idx]._source.svv_ini,
								"svv_max": reply[idx]._source.svv_max,
								"svv_cmm": reply[idx]._source.svv_cmm,
								"svv_used": reply[idx]._source.svv_used,
               } ;
            }

            DrawEdenChart(jvmData)
						DrawSurvivorChart(jvmData)
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
