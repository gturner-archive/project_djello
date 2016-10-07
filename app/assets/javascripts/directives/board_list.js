Djello.directive('boardList', ['_', 'ListsService', 'CardsService', function(_, ListsService, CardsService) {

  return {
    restrict: 'E',
    templateUrl: '/templates/directives/board_list_template.html',
    scope: {
      list: '='
    },
    link: function(scope) {

      scope.cards = CardsService.getCards();
      scope.updateList = {}
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
    }
  }

}])
