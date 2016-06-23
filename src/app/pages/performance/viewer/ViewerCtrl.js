(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance')
      .controller('ViewerCtrl', ViewerCtrl);

  /** @ngInject */
  function ViewerCtrl($scope, baConfig, $element, layoutPaths, $http) {
    console.log("Loading SUTs")

    $scope.suts = [
       {
         key: "activemq",
         sut: 'ActiveMQ',
       }, {
         key: "amq6",
         sut: 'JBoss A-MQ 6',
       }, {
         key: "artemis",
         sut: 'JBoss A-MQ 7',
       }
    ];

    console.log($scope.suts)
  }

})();
