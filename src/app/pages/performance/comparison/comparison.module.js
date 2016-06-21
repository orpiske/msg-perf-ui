(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance.comparison', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
            .state('performance.comparison', {
              url: '/comparison',
              templateUrl: 'app/pages/performance/comparison/comparison.html',
              title: 'Compare',
              sidebarMeta: {
                order: 600,
              },
            });
  }

})();
