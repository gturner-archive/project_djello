Djello.controller('CardsShowCtrl',
['$scope', 'close', 'card', 'CardsService', 'ListsService', 'UsersService', 'members', 'MembersService',
function($scope, close, card, CardsService, ListsService, UsersService, members, MembersService) {

  $scope.card = card;
  $scope.editingCard = {}
  $scope.updatedCard = {}
  $scope.users = UsersService.getUsers();
  members.then(function(members) {
    $scope.members = members
  })


  angular.copy(card, $scope.updatedCard)

  $scope.closeModal = function(result) {
    close(result, 500)
  }

  $scope.findList = function(listID) {
    return ListsService.find(listID);
  };

  $scope.editCard = function(attr) {
    var temp = $scope.editingCard[attr];
    $scope.editingCard = {};
    $scope.editingCard[attr] = temp;
    $scope.editingCard[attr] = !$scope.editingCard[attr]
    angular.copy(card, $scope.updatedCard)
  };

  $scope.updateCard = function() {
    CardsService.update($scope.updatedCard, card)
      .then(function(updatedCard) {
        angular.copy(updatedCard, $scope.updatedCard);
        $scope.editingCard = {};
      })
  }

  $scope.addMember = function() {
    MembersService.addMember($scope.card.id, {id: $scope.updatedCard.members})
      .then(function(newMember) {
        $scope.editingCard = {};
        $scope.updatedCard.members = '';
      })
  }

}]);
