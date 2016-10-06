var Djello = angular.module('Djello', ['ui.router', 'restangular'])


//Build lodash service for easy dependency injection
Djello.factory('_', ['$window', function($window) {
  return $window._;
}]);

Djello.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider',
  function($stateProvider, $urlRouterProvider, RestangularProvider) {

    //Set defaults for Restangular URL
    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');




}])
