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

    //Sets route on unrecongized path
    $urlRouterProvider.otherwise('/boards');

    $stateProvider
      .state('boards', {
        url: '/boards',
        template: '<div class="container" ui-view></div>',
        abstract: true,
        resolve: {
          boards: ['BoardsService', function(BoardsService) {
            return BoardsService.getBoards();
          }],

          lists: ['ListsService', 'boards', function(ListsService, boards) {
            return ListsService.getLists();
          }],
          cards: ['CardsService', function(CardsService) {
            return CardsService.getCards();
          }]
        }
      })
      .state('boards.index', {
        url: '',
        templateUrl: '/templates/boards/index.html',
        controller: 'BoardsIndexCtrl'
      })
      .state('boards.show', {
        url: '/:id',
        templateUrl: '/templates/boards/show.html',
        controller: 'BoardsShowCtrl',
        resolve: {
          currentBoard: ['boards','$stateParams', 'BoardsService', function(boards, $stateParams, BoardsService) {
            return BoardsService.find($stateParams.id)
          }]
        }
      })



}])
