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

    $scope.durations = [
        { label: "1h", value: 1},
        { label: "2h", value: 2},
        { label: "3h", value: 3},
        { label: "4h", value: 4},
      ];

    console.log("Initializing viewer")
  }

})();
