(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance')
      .controller('SutCtrl', SutCtrl);

  /** @ngInject */
  function SutCtrl($scope, mptUIConfig, $http) {
    $scope.loadedSuts = false;
    $scope.loadedTests = false;

    $scope.loaded = {
      suts: false,
      tests: false,
      percentiles: false,
    };

    $scope.plotted = {
      sthroughput: false,
      rthroughput: false,
      rlatency: false,
    }

    $scope.active = {
      test: null,
      sut: null,
      start_time: null,
      duration: null,
      range: null,
    };

    $scope.percentiles = {
        v1 : {
          label: "5ms",
          value: null,
        },
        v2 : {
          label: "10ms",
          value: null,
        },
        v3 : {
          label: "25ms",
          value: null,
        },
        v4 : {
          label: "50ms",
          value: null,
        },
        v5 : {
          label: "75ms",
          value: null,
        },
        v6 : {
          label: "90ms",
          value: null,
        },
        v7 : {
          label: "100ms",
          value: null,
        },
        v8 : {
          label: "500ms",
          value: null,
        },
        v9 : {
          label: "900ms",
          value: null,
        },
        v10 : {
          label: "1000ms",
          value: null,
        },
    }

    var suts;
    var http;
    var mptUIConfig;

    if (this.http == null) {
      this.http = http;
    }

    if (this.mptUIConfig == null) {
      this.mptUIConfig = mptUIConfig;
    }

    console.log("Loading SUTs");

    $scope.alertMe = function(someValue) {
      console.log("Changed to " + someValue);
    };

    function LoadTests(key, version) {
        $scope.loaded.tests = false;
        var url = mptUIConfig.apiUrl + "/test/info/_search?q=sut_key:" + key +
            "&q=sut_version:" + version ;

        console.log("Loading the tests for " + key + "version " + version)

        $http.get(url).then(function(response) {
            var reply = response.data.hits.hits;
            var ret = new Array();

            // console.log("Done loading tests : " + reply)
            console.log("Number of tests for " + key + ": " + response.data.hits.total)
            for (var idx in reply) {
                console.log("Test ID: " + reply[idx]._source.test_id)
                console.log("Test req url: " + reply[idx]._source.test_req_url)
                ret[idx] = reply[idx]._source;
            }

            $scope.testInfo = ret;
            $scope.loaded.tests = true;

          }, function(response) {
              if (response.status == 404) {
                alert('Did not find any tests to display');
              } else {
                alert('Unable to contact server: ' + response);
              }

          });
    }

    $scope.loadTests = LoadTests;

    var url = mptUIConfig.apiUrl + "/sut/messaging/_search";

    $http.get(url).then(function(response) {
        var reply=response.data.hits.hits;
        var ret = new Array()

        console.log("Done loading SUTs: " + reply)
        console.log("Num records:" + response.data.hits.total)
        for (var idx in reply) {
            console.log("Reply data:" + reply[idx]._source.sut_name)
            ret[idx] = reply[idx]._source;
        }

        if (!$scope.loaded.suts) {
          LoadTests(ret[0].sut_key, ret[0].sut_version)
        }

        $scope.suts = ret;
        $scope.loaded.suts = true;


      }, function(response) {
          if (response.status == 404) {
            alert('Did not find any SUTs to display')
          } else {
            alert('Unable to contact server: ' + response)
          }
      });

  }

})();
