Djello.factory('ActivityService', ['Restangular', '_', '$q', function(Restangular, _, $q) {

  var _activities = {};

  var _populateActivities = function(card_id) {
    return Restangular.one('cards', card_id).all('activities').getList().then(function(activities) {
      return _activities[card_id] = activities
    });
  }

  var getActivities = function(card_id) {
    if (_activities[card_id]) {
      return $q(function(resolve) {
        resolve(_activities[card_id])
      });
    } else {
      return _populateActivities(card_id)
    }
  }

  var createActivity = function(card_id, activityParams) {
    return Restangular.one('cards', card_id).all('activities').post(activityParams)
      .then(function(activity) {
        if (!_activities[card_id]) {
          _activities[card_id] = [];
        }
        _activities[card_id].push(activity);
        return activity;
      })
  }

  return {
    getActivities: getActivities,
    createActivity: createActivity
  }

}])
