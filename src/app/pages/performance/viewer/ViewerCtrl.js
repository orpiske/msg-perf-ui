(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance')
      .controller('ViewerCtrl', ViewerCtrl);

  /** @ngInject */
  function ViewerCtrl($scope, baConfig, $element, layoutPaths, $http) {
    var something;
    var otherthing;

    console.log("Loading SUTs")

    $scope.init = function(name, id) {
        //This function is sort of private constructor for controller
        something = id;
        otherthing = name;

        console.log("V-Init something = " + something)
        console.log("V-Init otherthing = " + otherthing)
    };

    $scope.$watch('selectSuts', function(newValue, oldValue) {
      console.log("Old thing = " + something)
      // something = selectSuts.sut
      // alert('hey, selectSuts has changed!');
      console.log("New thing = " + something)
   });



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
