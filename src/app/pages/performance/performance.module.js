/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance', [])
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
            icon: 'ion-compose',
            order: 250,
          },
        })
        .state('stats', {
          url: '/stats',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Performance Statistics',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 250,
          },
        });
  }
})();
