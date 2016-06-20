/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.amCharts')
      .controller('LineChartCtrl', LineChartCtrl);

  /** @ngInject */
  function LineChartCtrl($scope, baConfig, $element, layoutPaths) {
    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    var lineChart = AmCharts.makeChart(id, {
      type: 'serial',
      theme: 'blur',
      color: layoutColors.defaultText,
      marginTop: 0,
      marginRight: 15,
      dataProvider: [
        {
            "key_as_string": "2016-06-13 13:34:17.000",
            "key": 1465824857000,
            "doc_count": 888
          },
          {
            "key_as_string": "2016-06-13 13:34:18.000",
            "key": 1465824858000,
            "doc_count": 1064
          },
          {
            "key_as_string": "2016-06-13 13:34:19.000",
            "key": 1465824859000,
            "doc_count": 980
          },
          {
            "key_as_string": "2016-06-13 13:34:20.000",
            "key": 1465824860000,
            "doc_count": 1062
          },
          {
            "key_as_string": "2016-06-13 13:34:21.000",
            "key": 1465824861000,
            "doc_count": 1000
          },
          {
            "key_as_string": "2016-06-13 13:34:22.000",
            "key": 1465824862000,
            "doc_count": 946
          },
          {
            "key_as_string": "2016-06-13 13:34:23.000",
            "key": 1465824863000,
            "doc_count": 1010
          },
          {
            "key_as_string": "2016-06-13 13:34:24.000",
            "key": 1465824864000,
            "doc_count": 846
          },
          {
            "key_as_string": "2016-06-13 13:34:25.000",
            "key": 1465824865000,
            "doc_count": 1048
          },
          {
            "key_as_string": "2016-06-13 13:34:26.000",
            "key": 1465824866000,
            "doc_count": 1200
          },
          {
            "key_as_string": "2016-06-13 13:34:27.000",
            "key": 1465824867000,
            "doc_count": 1080
          },
          {
            "key_as_string": "2016-06-13 13:34:28.000",
            "key": 1465824868000,
            "doc_count": 1185
          },
          {
            "key_as_string": "2016-06-13 13:34:29.000",
            "key": 1465824869000,
            "doc_count": 1012
          },
          {
            "key_as_string": "2016-06-13 13:34:30.000",
            "key": 1465824870000,
            "doc_count": 956
          },
          {
            "key_as_string": "2016-06-13 13:34:31.000",
            "key": 1465824871000,
            "doc_count": 950
          },
          {
            "key_as_string": "2016-06-13 13:34:32.000",
            "key": 1465824872000,
            "doc_count": 1064
          },
          {
            "key_as_string": "2016-06-13 13:34:33.000",
            "key": 1465824873000,
            "doc_count": 965
          },
          {
            "key_as_string": "2016-06-13 13:34:34.000",
            "key": 1465824874000,
            "doc_count": 1102
          },
          {
            "key_as_string": "2016-06-13 13:34:35.000",
            "key": 1465824875000,
            "doc_count": 938
          },
          {
            "key_as_string": "2016-06-13 13:34:36.000",
            "key": 1465824876000,
            "doc_count": 1043
          },
          {
            "key_as_string": "2016-06-13 13:34:37.000",
            "key": 1465824877000,
            "doc_count": 865
          },
          {
            "key_as_string": "2016-06-13 13:34:38.000",
            "key": 1465824878000,
            "doc_count": 879
          },
          {
            "key_as_string": "2016-06-13 13:34:39.000",
            "key": 1465824879000,
            "doc_count": 934
          },
          {
            "key_as_string": "2016-06-13 13:34:40.000",
            "key": 1465824880000,
            "doc_count": 1000
          },
          {
            "key_as_string": "2016-06-13 13:34:41.000",
            "key": 1465824881000,
            "doc_count": 1151
          },
          {
            "key_as_string": "2016-06-13 13:34:42.000",
            "key": 1465824882000,
            "doc_count": 1000
          },
          {
            "key_as_string": "2016-06-13 13:34:43.000",
            "key": 1465824883000,
            "doc_count": 989
          },
          {
            "key_as_string": "2016-06-13 13:34:44.000",
            "key": 1465824884000,
            "doc_count": 952
          },
          {
            "key_as_string": "2016-06-13 13:34:45.000",
            "key": 1465824885000,
            "doc_count": 1032
          },
          {
            "key_as_string": "2016-06-13 13:34:46.000",
            "key": 1465824886000,
            "doc_count": 1042
          },
          {
            "key_as_string": "2016-06-13 13:34:47.000",
            "key": 1465824887000,
            "doc_count": 1003
          },
          {
            "key_as_string": "2016-06-13 13:34:48.000",
            "key": 1465824888000,
            "doc_count": 1115
          },
          {
            "key_as_string": "2016-06-13 13:34:49.000",
            "key": 1465824889000,
            "doc_count": 962
          },
          {
            "key_as_string": "2016-06-13 13:34:50.000",
            "key": 1465824890000,
            "doc_count": 916
          },
          {
            "key_as_string": "2016-06-13 13:34:51.000",
            "key": 1465824891000,
            "doc_count": 665
          },
          {
            "key_as_string": "2016-06-13 13:34:52.000",
            "key": 1465824892000,
            "doc_count": 919
          },
          {
            "key_as_string": "2016-06-13 13:34:53.000",
            "key": 1465824893000,
            "doc_count": 1005
          },
          {
            "key_as_string": "2016-06-13 13:34:54.000",
            "key": 1465824894000,
            "doc_count": 999
          },
          {
            "key_as_string": "2016-06-13 13:34:55.000",
            "key": 1465824895000,
            "doc_count": 998
          },
          {
            "key_as_string": "2016-06-13 13:34:56.000",
            "key": 1465824896000,
            "doc_count": 1007
          },
          {
            "key_as_string": "2016-06-13 13:34:57.000",
            "key": 1465824897000,
            "doc_count": 1024
          },
          {
            "key_as_string": "2016-06-13 13:34:58.000",
            "key": 1465824898000,
            "doc_count": 1137
          },
          {
            "key_as_string": "2016-06-13 13:34:59.000",
            "key": 1465824899000,
            "doc_count": 997
          },
          {
            "key_as_string": "2016-06-13 13:35:00.000",
            "key": 1465824900000,
            "doc_count": 849
          },
          {
            "key_as_string": "2016-06-13 13:35:01.000",
            "key": 1465824901000,
            "doc_count": 1309
          },
          {
            "key_as_string": "2016-06-13 13:35:02.000",
            "key": 1465824902000,
            "doc_count": 1064
          },
          {
            "key_as_string": "2016-06-13 13:35:03.000",
            "key": 1465824903000,
            "doc_count": 1086
          },
          {
            "key_as_string": "2016-06-13 13:35:04.000",
            "key": 1465824904000,
            "doc_count": 809
          },
          {
            "key_as_string": "2016-06-13 13:35:05.000",
            "key": 1465824905000,
            "doc_count": 826
          },
          {
            "key_as_string": "2016-06-13 13:35:06.000",
            "key": 1465824906000,
            "doc_count": 979
          },
          {
            "key_as_string": "2016-06-13 13:35:07.000",
            "key": 1465824907000,
            "doc_count": 1898
          },
          {
            "key_as_string": "2016-06-13 13:35:08.000",
            "key": 1465824908000,
            "doc_count": 2202
          },
          {
            "key_as_string": "2016-06-13 13:35:09.000",
            "key": 1465824909000,
            "doc_count": 2082
          },
          {
            "key_as_string": "2016-06-13 13:35:10.000",
            "key": 1465824910000,
            "doc_count": 2030
          },
          {
            "key_as_string": "2016-06-13 13:35:11.000",
            "key": 1465824911000,
            "doc_count": 1938
          },
          {
            "key_as_string": "2016-06-13 13:35:12.000",
            "key": 1465824912000,
            "doc_count": 3
          }
      ],
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

})();
