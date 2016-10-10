Djello.factory('MembersService', ['Restangular', '$q', '_', 'UsersService', 'ActivityService', function(Restangular, $q, _, UsersService, ActivityService) {

  var _members = {};
  var _nonMembers = {};
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
      _.remove(_nonMembers[id], function(user) {
        return user.id === member.id
      });
      ActivityService.createActivity(id, {description: "added " + member.username })
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

  var getNonMembers = function(id, currentUser) {
    if (_nonMembers[id]) {
      return _nonMembers[id]
    } else {
      return _populateNonMembers(id, currentUser)
    }
  }

  var _populateNonMembers = function(id, currentUser) {
    var users = UsersService.getUsers();
    var nonMembers = _.differenceBy(users, _members[id], 'id');
    for (var i = 0; i < nonMembers.length; i++) {
      if (nonMembers[i].id === currentUser.id) {
        console.log('Hello')
        nonMembers.splice(i, 1);
        break;
      }
    }
    _nonMembers[id] = nonMembers;
    return _nonMembers[id];
  }

  var destroyMembership = function(card_id, member) {
    var membership = _.find(member.memberships, function(membership) {
      return membership.card_id == card_id
    })
    return Restangular.one("cards", card_id).one('memberships', membership.id).remove().then(function(destroyedMember) {
      ActivityService.createActivity(card_id, {description: "removed " + destroyedMember.username })
      _nonMembers[card_id].push(destroyedMember);
      _.remove(_members[card_id], function(memberInList) {
        return memberInList.id === destroyedMember.id
      })
    })
  }

  return {
    getMembers: getMembers,
    addMember: addMember,
    destroyMembership: destroyMembership,
    getNonMembers: getNonMembers
  }

}]);
