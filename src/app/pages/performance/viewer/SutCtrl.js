(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance')
      .controller('SutCtrl', SutCtrl);

  /** @ngInject */
  function SutCtrl($scope, $http) {
    $scope.loadedSuts = false
    console.log("Loading SUTs")
    var suts;


    var url = 'http://localhost:9200/sut/messaging/_search';
    $http.get(url).then(function(response) {
        var reply=response.data.hits.hits;
        var ret = new Array()

        console.log("Done loading SUTs: " + reply)
        console.log("Num records:" + response.data.hits.total)
        for (var idx in reply) {
            console.log("Reply data:" + reply[idx]._source.sut)
            ret[idx] = reply[idx]._source;
        }

        $scope.suts = ret;
        $scope.loadedSuts = true;

      }, function(response) {
          if (response.status == 404) {
            alert('Did not find any SUTs to display')
          } else {
            alert('Unable to contact server: ' + response)
          }

      });
  }

})();
