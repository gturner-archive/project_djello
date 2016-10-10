Djello.factory('SubscriptionsService', ['Restangular', function(Restangular) {

  var _subscriptions = [];

  var populateSubscriptions  = function() {
    return Restangular.all('subscriptions').getList().then(function(subscriptions) {
      return angular.copy(subscriptions, _subscriptions)
    });
  };

  var updateSubscription = function(updatedCard) {
    for (var i = 0; i < _subscriptions.length; i++) {
      if (_subscriptions[i].id == updatedCard.id) {
        angular.copy(updatedCard, _subscriptions[i])
        break;
      }
    }
  }

  var deleteSubscription = function(deletedCard) {
    for (var i = 0; i < _subscriptions.length; i++) {
      if (_subscriptions[i].id === deletedCard.id) {
        _subscriptions.splice(i, 1)
        break;
      }
    }
  }

  return {
    populateSubscriptions: populateSubscriptions,
    updateSubscription: updateSubscription,
    deleteSubscription: deleteSubscription
  }

}]);
