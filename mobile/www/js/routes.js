angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('eCOnnY', {
      url: '/econny',
      templateUrl: 'templates/eCOnnY.html',
      controller: 'eCOnnYCtrl'
    })





    .state('plantList', {
      url: '/list',
      abstract:true,
      templateUrl: 'templates/plantList.html',
      controller: 'plantListCtrl'
    })




    .state('plantList.new', {
      url: '/new',
      views: {
        'listView': {
          templateUrl: 'templates/bind.html',
          controller: 'plantListCtrl'
        }
      }
    })




    .state('plantList.search', {
      url: '/search',
      views: {
        'listView': {
          templateUrl: 'templates/search.html',
          controller: 'plantListCtrl'
        }
      }
    })




    .state('livingRoom', {
      url: '/living',
      templateUrl: 'templates/livingRoom.html',
      controller: 'livingRoomCtrl'
    })





    .state('guidePage', {
      url: '/guide',
      templateUrl: 'templates/guidePage.html',
      controller: 'guidePageCtrl'
    })


    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/econny');

});
