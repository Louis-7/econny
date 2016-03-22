// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.provider', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function (EnvironmentDataProvider, EnvironmentString) {
    //LOCAL,MOBILE,DEV,STAG,PROD
    EnvironmentDataProvider.setEnvironment(EnvironmentString.DEV);
  })

  .config(function ($httpProvider) {
    $httpProvider.defaults.transformRequest = function (data) {
      if (data === undefined) {
        return data;
      }
      if (typeof (data) === typeof ("")) {
        return data;
      }
      return param(data);
    };

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  });

function param(param) {
  var str = "",
    i;
  for (i in param) {
    if (param.hasOwnProperty(i)) {
      if (str[0] !== undefined) {
        str += "&";
      }
      str += encodeURIComponent(i);
      str += "=";
      str += encodeURIComponent(param[i]);
    }
  }
  return str;
}
