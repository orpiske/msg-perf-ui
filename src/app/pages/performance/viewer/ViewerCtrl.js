(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance')
      .controller('ViewerCtrl', ViewerCtrl);

  /** @ngInject */
  function ViewerCtrl($scope, $http) {
    console.log("Loading SUTs")

    $scope.suts = [
       {
         key: "activemq",
         sut: 'ActiveMQ',
       }, {
         key: "amq6",
         sut: 'JBoss A-MQ 6',
       }, {
         key: "amq7",
         sut: 'JBoss A-MQ 7',
       }
    ];

    console.log($scope.suts)
  }

})();
