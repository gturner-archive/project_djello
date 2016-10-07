Djello.controller('BoardsIndexCtrl',
['$scope', 'boards', 'lists', 'BoardsService', 'SubscriptionsService', 'ModalService', 'MembersService',
function($scope, boards, lists, BoardsService, SubscriptionsService, ModalService, MembersService) {

  $scope.allBoards = boards;
  $scope.allLists = lists;
  SubscriptionsService.populateSubscriptions().then(function(subscriptions) {
    console.log(subscriptions);
    $scope.subscriptions = subscriptions;
  })

  $scope.newBoard = {};

  $scope.createBoard = function() {
    BoardsService.create($scope.newBoard);
    $scope.newBoard = {};
  };

  $scope.showModal = function(card) {
    ModalService.showModal({
      templateUrl: "/templates/cards/show.html",
      controller: "CardsShowCtrl",
      inputs: {
        card: card,
        members: MembersService.getMembers(card.id)
      }
    }).then(function(modal) {

      //it's a bootstrap element, use 'modal' to show it
      modal.element.modal();
      modal.close.then(function(result) {
        console.log(result);
      });
    });
  }

}]);
