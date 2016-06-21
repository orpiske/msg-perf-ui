(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance.viewer', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
            .state('performance.viewer', {
              url: '/viewer',
              templateUrl: 'app/pages/performance/viewer/viewer.html',
              title: 'View',
              sidebarMeta: {
                order: 800,
              },
            });
  }

})();
