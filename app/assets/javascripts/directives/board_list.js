Djello.directive('boardList',
['_', 'ListsService', 'CardsService', 'ModalService', 'MembersService', 'ActivityService',
function(_, ListsService, CardsService, ModalService, MembersService, ActivityService) {

  return {
    restrict: 'E',
    templateUrl: '/templates/directives/board_list_template.html',
    scope: {
      list: '='
    },
    link: function(scope) {

      scope.cards = CardsService.getCards();
      scope.updateList = {}
      scope.newCard = {}
      scope.updateList.title = scope.list.title
      scope.updateList.description = scope.list.description

      scope.deleteList = function() {
        ListsService.destroy(scope.list)
      }

      scope.editList = function() {
        ListsService.update(scope.updateList, scope.list)
          .then(function(list) {
            scope.editingListTitle = false;
            scope.editingListDescription = false;
          })
      }

      scope.cancelTitleEdit = function() {
        scope.editingListTitle = false;
        scope.updateList.title = scope.list.title
      }

      scope.cancelDescriptionEdit = function() {
        scope.editingListDescription = false;
        scope.updateList.description = scope.list.description
      }

      scope.cancelNewCard = function() {
        scope.newCard = {};
        scope.creatingCard = false;
      }

      scope.createCard = function() {
        scope.newCard.list_id = scope.list.id;
        CardsService.create(scope.newCard)
          .then(function() {
            scope.newCard = {};
            scope.creatingCard = false;
          })
      }

      scope.showModal = function(card) {
        ModalService.showModal({
          templateUrl: "/templates/cards/show.html",
          controller: "CardsShowCtrl",
          inputs: {
            card: card,
            members: MembersService.getMembers(card.id),
            activities: ActivityService.getActivities(card.id)
          }
        }).then(function(modal) {

          //it's a bootstrap element, use 'modal' to show it
          modal.element.modal();
          modal.close.then(function(result) {
            console.log(result);
          });
        });
      }
    }
  }

}])
