Djello.factory('UsersService', ['Restangular', function(Restangular) {

  var _users = [];
  var _availableUsers = {}

  var populateUsers = function() {
    return Restangular.all('users').getList().then(function(users) {
      return angular.copy(users, _users);
    })
  };

  var getUsers = function(card) {
    if (_users.length) {
      return _users;
    } else {
      return populateUsers();
    }
  };

  return {
    getUsers: getUsers
  }

}])
