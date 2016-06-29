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
        { label: "30m", value: 30},
        { label: "1h", value: 60},
        { label: "2h", value: 120},
        { label: "3h", value: 180},
        { label: "4h", value: 240},
      ];

    $scope.durations = [
        { label: "30m", value: 30},
        { label: "1h", value: 60},
        { label: "2h", value: 120},
        { label: "3h", value: 180},
        { label: "4h", value: 240},
      ];

    console.log("Initializing viewer")
  }

})();
