/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance', [
    // 'BlurAdmin.pages.performance.comparison',
    'BlurAdmin.pages.performance.viewer',
    // 'BlurAdmin.pages.performance.stats'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('performance', {
          url: '/performance',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Performance',
          sidebarMeta: {
            icon: 'ion-stats-bars',
            order: 250,
          },
        });
  }

})();
