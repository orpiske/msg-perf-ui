(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance')
      .controller('ViewerCtrl', ViewerCtrl);

  /** @ngInject */
  function ViewerCtrl($scope, mptUIConfig, $http) {
    $scope.date = {
      initial: "",
      final: "",
    };

    $scope.start_times = [
        { label: "0", value: 0},
        { label: "15m", value: 15},
        { label: "30m", value: 30},
        { label: "45m", value: 15},
        { label: "1h", value: 60},
        { label: "2h", value: 120},
        { label: "3h", value: 180},
        { label: "4h", value: 240},
        { label: "5h", value: 300},
        { label: "6h", value: 360},
        { label: "7h", value: 420},
        { label: "8h", value: 480},
      ];

    $scope.durations = [
        { label: "15m", value: 15},
        { label: "30m", value: 30},
        { label: "45m", value: 15},
        { label: "1h", value: 60},
        { label: "2h", value: 120},
        { label: "3h", value: 180},
        { label: "4h", value: 240},
      ];

    console.log("Initializing viewer")
  }

})();
