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

		function DoChart(key, test_id, version, date, start_time, duration, direction) {


			function DrawThroughputChart(throughput, direction) {
				if (throughput.length == 0) {
					if (direction === "receiver") {
							$scope.plotted.rthroughput = false;
					}
					else {
							$scope.plotted.sthroughput = false;
					}
				}
				else {
					if (direction === "receiver") {
							$scope.plotted.rthroughput = true;
					}
					else {
							$scope.plotted.sthroughput = true;
					}
				}

				var layoutColors = baConfig.colors;
				var id = $element[0].getAttribute('id');

				//console.log("Drawing throughput chart: " + throughput);

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
							title: "Messages per second",
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
							valueField: 'rate'
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
						categoryBalloonDateFormat: 'YYYY-MM-DD JJ:NN:SS',
						cursorAlpha: 0,
						valueLineEnabled: true,
						valueLineBalloonEnabled: true,
						valueLineAlpha: 0.5,
						fullWidth: true
					},
					dataDateFormat: 'YYYY-MM-DD JJ:NN:SS',
					categoryField: 'ts',
					categoryAxis: {
						labelRotation: 90,
						minPeriod: '1ss',
						parseDates: true,
						equalSpacing: true,
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

			var maxSize = (duration * 60) / 10
			var url = mptUIConfig.apiUrl + "/" + key + '/mpt-' + direction + '-throughput/_search?size=' + maxSize;


			/*
			 * This is ugly. I know and I agree. I will fix this later, after
			 * I learn how to do this the correct way in this hideous
			 * language
			 */
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

			$http.post(url,requestData).then(function(response) {
						var reply = response.data.hits.hits;
						var ret = new Array();

						for (var idx in reply) {
							ret[idx] = {
								"ts": reply[idx]._source.ts,
								"rate": reply[idx]._source.rate,
								"cid": reply[idx]._source.cid
							} ;
						}


						DrawThroughputChart(ret, direction)
				}, function(response) {
						if (response.status == 404) {
							alert('Did not find any results for : ' + sut)
						} else {
							alert('Unsuccessfull server response. Error code: '
							+  response.status)
						}

				});
		}



		$scope.tpInitThroughput = function(key, test_id, version, date, start_time, duration, direction) {
				console.log("Initializing throughput")

				var tpWatchGroup = ['selected.active.sut', 'selected.active.test', 'selected.active.start_time', 'selected.active.duration']

				$scope.$watchGroup(tpWatchGroup, function() {

					console.log("SUT, test, start time or duration changed -> Redrawing throughput graph for " +
							$scope.selected.active.test.test_req_url + " " +
							$scope.selected.active.test.test_start_time +
							"/" + $scope.selected.active.start_time.value + " - " +
							$scope.selected.active.duration.value)

					$scope.updateThroughputChart(
						$scope.selected.active.test.test_req_url,
						$scope.selected.active.test.test_id,
						$scope.selected.active.sut.sut_version,
						$scope.selected.active.test.test_start_time,
						$scope.selected.active.start_time.value,
						$scope.selected.active.duration.value,
						direction
					)
				});
		}

		$scope.updateThroughputChart = DoChart;

	}

})();
