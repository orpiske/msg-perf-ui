/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance')
      .controller('LatencyPercentilesCtrl', LatencyPercentilesCtrl);


  /** @ngInject */
  function LatencyPercentilesCtrl($scope, mptUIConfig, $http) {
    console.log("Percentiles stuff ")

    function CalculatePercentiles(key, test_id, version) {
      console.log("Requesting test percentiles from the server")
      var url = mptUIConfig.apiUrl + "/" + key + '/mpt-receiver-latency/_search?size=0';

      /*
       * This is ugly. I know and I agree. I will fix this later, after
       * I learn how to do this the correct way in this hideous
       * language
       */
      var requestData = "{\
          \"aggs\" : { \
                \"latency_percentiles\" : { \
                    \"percentile_ranks\" : { \
                        \"field\" : \"latency\", \
                        \"values\" : [5, 10, 25, 50, 75, 90, 100, 500, 900, 1000] \
                    } \
                } \
            } \
        }"

        console.log("Sending percentiles request to " + url)
        $http.post(url,requestData).then(function(response) {
            var percentiles=response.data.aggregations.latency_percentiles.values;

            if (percentiles["100.0"] === "NaN") {
              console.log("There's not percentiles for this set")
              $scope.loaded.percentiles = false;

              $scope.percentiles.v1.value = "";
              $scope.percentiles.v2.value = "";
              $scope.percentiles.v3.value = "";
              $scope.percentiles.v4.value = "";
              $scope.percentiles.v5.value = "";
              $scope.percentiles.v6.value = "";
              $scope.percentiles.v7.value = "";
              $scope.percentiles.v8.value = "";
              $scope.percentiles.v9.value = "";
              $scope.percentiles.v10.value = "";
            }
            else {
              $scope.loaded.percentiles = true;

              $scope.percentiles.v1.value = percentiles["5.0"];
              $scope.percentiles.v2.value = percentiles["10.0"];
              $scope.percentiles.v3.value = percentiles["25.0"];
              $scope.percentiles.v4.value = percentiles["50.0"];
              $scope.percentiles.v5.value = percentiles["75.0"];
              $scope.percentiles.v6.value = percentiles["90.0"];
              $scope.percentiles.v7.value = percentiles["100.0"];
              $scope.percentiles.v8.value = percentiles["500.0"];
              $scope.percentiles.v9.value = percentiles["900.0"];
              $scope.percentiles.v10.value = percentiles["1000.0"];
            }




          }, function(response) {
            if (response.status == 404) {
              alert('Did not find any results for : ' + sut)
            } else {
              alert('Unsuccessfull server response. Error code: '
                + response.status)
            }
          });

    }

    $scope.updatePercentiles = CalculatePercentiles

    $scope.tpInitPercentiles = function(key, test_id, version) {
        console.log("Initializing percentile methods")
        var watchGroup = ['selected.active.test', 'selected.active.sut']

        $scope.$watchGroup(watchGroup,  function() {

          console.log("Recalculating percentiles for " + key + " " + test_id)

          $scope.updatePercentiles(key, test_id, version)
        });
    }
  }

})();
