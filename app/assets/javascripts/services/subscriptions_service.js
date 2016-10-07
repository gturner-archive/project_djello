Djello.factory('SubscriptionsService', ['Restangular', function(Restangular) {

  var _subscriptions = [];

  var populateSubscriptions  = function() {
    return Restangular.all('subscriptions').getList().then(function(subscriptions) {
      return angular.copy(subscriptions, _subscriptions)
    });
  };

  return {
    populateSubscriptions: populateSubscriptions
  }

}]);
