Djello.controller('BoardsShowCtrl',
['$scope', 'boards', 'lists', 'currentBoard', 'BoardsService', '$state', 'ListsService',
function($scope, boards, lists, currentBoard, BoardsService, $state, ListsService) {

  $scope.currentBoard = currentBoard
  $scope.newList = {}
  $scope.updateBoard = {}
  $scope.updateBoard.title = currentBoard.title

  $scope.allBoards = boards;
  $scope.allLists = lists;
  $scope.currentBoardLists = [];

  $scope.$watch('currentBoard', function() {
    if ($scope.currentBoard !== null) {
      angular.copy(lists[$scope.currentBoard.id], $scope.currentBoardLists)
    }
  });

  $scope.deleteBoard = function() {
    BoardsService.destroy($scope.currentBoard)
      .then(function() {
        $state.go('boards.index');
      })
  }

  $scope.createList = function() {
    $scope.newList.board_id = currentBoard.id
    ListsService.create($scope.newList).then(function() {
      $scope.newList = {};
      $scope.addingList = false;
    })
  }

  $scope.$on('list.change', function() {
    angular.copy(lists[$scope.currentBoard.id], $scope.currentBoardLists)
  })

  $scope.editBoard = function() {
    BoardsService.update($scope.updateBoard, $scope.currentBoard)
      .then(function(board) {
        $scope.editingBoard = false;
      })
  }

  $scope.cancelEdit = function() {
    $scope.editingBoard = false;
    $scope.updateBoard.title = $scope.currentBoard.title
  }


}]);
