(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
            .state('stats', {
              url: '/stats',
              templateUrl: 'app/pages/performance/stats/stats.html',
              title: 'Performance Statistics',
              sidebarMeta: {
                order: 800,
              },
            });
  }

})();
