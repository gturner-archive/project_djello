Djello.directive('cardMember', ['MembersService', function(MembersService) {

  return {
    restrict: 'E',
    templateUrl: '/templates/directives/card_member_template.html',
    scope: {
      member: '=',
      card: '='
    },
    link: function(scope) {
      scope.destroyMembership = function() {
        MembersService.destroyMembership(scope.card.id, scope.member)
      }
    }
  }

}])
