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
         version: "5.12.0"
       },
       {
         key: "activemq",
         sut: 'ActiveMQ',
         version: "5.13.3"
       },
       {
         key: "amq6",
         sut: 'JBoss A-MQ 6',
         version: "6.2.1"
       },
       {
         key: "amq6",
         sut: 'JBoss A-MQ 6',
         version: "6.1.0"
       },
       {
         key: "artemis",
         sut: 'JBoss A-MQ 7',
         version: "7.0.0"
       }
    ];

    console.log($scope.suts)
  }

})();
