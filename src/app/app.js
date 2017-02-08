'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.router',
  'toastr',
  "xeditable",
  'ui.slimscroll',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
])
  .constant("mptUIConfig", {
         "apiUrl": "http://" + window.location.hostname + ":" + 9200

    });
