(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance.stats', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
            .state('performance.stats', {
              url: '/stats',
              templateUrl: 'app/pages/performance/stats/stats.html',
              title: 'Statistics',
              sidebarMeta: {
                order: 700,
              },
            });
  }

})();
