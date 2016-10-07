Djello.factory('MembersService', ['Restangular', '$q', '_', function(Restangular, $q, _) {

  var _members = {};
  var subscribed_cards = [];

  var populateSubscribedCards = function() {
    
  }

  var populateMembers = function(id) {
    return Restangular.one("cards", id).all('memberships').getList().then(function(members) {
      _members[id] = members;
      return _members[id];
    });
  };

  var addMember = function(id, memberParams) {
    return Restangular.one("cards", id).all('memberships').post(memberParams).then(function(member) {
      return _members[id].push(member);
    })
  }

  var getMembers = function(id) {
    if (_members[id]) {
      return $q(function(resolve) {
        resolve(_members[id])
      });
    } else {
      return populateMembers(id)
    }
  }

  var destroyMembership = function(card_id, member) {
    var membership = _.find(member.memberships, function(membership) {
      return membership.card_id == card_id
    })
    return Restangular.one("cards", card_id).one('memberships', membership.id).remove().then(function(destroyedMember) {
      _.remove(_members[card_id], function(memberInList) {
        return memberInList.id === destroyedMember.id
      })
    })
  }

  return {
    getMembers: getMembers,
    addMember: addMember,
    destroyMembership: destroyMembership
  }

}]);
