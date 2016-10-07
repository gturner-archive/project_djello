Djello.factory('ListsService',
['Restangular', '_', 'BoardsService', '$rootScope',
function(Restangular, _, BoardsService, $rootScope) {

  var _lists = {};

  var create = function(listParams) {
    return Restangular.all('lists').post(listParams)
      .then(function(list) {
        addList(list)
        $rootScope.$broadcast('list.change')
      })
  };

  var addList = function(list) {
    if (!_lists[list.board_id]) {
      _lists[list.board_id] = [];
    }
    _lists[list.board_id].push(list)
  };

  var populateLists = function() {
    return Restangular.all('lists').getList()
      .then(function(lists) {
        var tempLists = {};
        lists.forEach(function(list) {
          if (!tempLists[list.board_id]) {
            tempLists[list.board_id] = [];
          }
          tempLists[list.board_id].push(list)
        })
        return angular.copy(tempLists, _lists);
      })
  }

  var getLists = function() {
    if (_.isEmpty(_lists)) {
      return populateLists();
    } else {
      return _lists;
    }
  }

  var destroy = function(list) {
    list.remove().then(function(removedList) {
       _.remove(_lists[removedList.board_id], function(board) {
         return removedList.id === board.id
       })
       $rootScope.$broadcast('list.change');
    });
  }

  var update = function(listParams, current) {
    return current.patch(listParams).then(function(updatedList) {
      var toUpdate = _.find(_lists[updatedList.board_id], function(list) {
        return list.id === updatedList.id
      })
      angular.copy(updatedList, toUpdate)
      $rootScope.$broadcast('list.change');
    });
  }

  return {
    create: create,
    destroy: destroy,
    getLists: getLists,
    update: update
  }

}]);
