Djello.controller('BoardsIndexCtrl',
['$scope', 'boards', 'lists', 'BoardsService',
function($scope, boards, lists, BoardsService) {

  $scope.allBoards = boards;
  $scope.allLists = lists;

  $scope.newBoard = {};

  $scope.createBoard = function() {
    BoardsService.create($scope.newBoard);
    $scope.newBoard = {};
  };

}]);
