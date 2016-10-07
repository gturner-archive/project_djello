Djello.directive('listCard', [function() {

  return {
    restrict: 'E',
    templateUrl: '/templates/directives/list_card_template.html',
    scope: {
      card: '='
    }
  }

}]);
