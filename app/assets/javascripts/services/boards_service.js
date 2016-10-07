Djello.factory('BoardsService', ['Restangular', '_', '$rootScope', function(Restangular, _, $rootScope) {

  var _boards = [];

  var populateBoards = function() {
    return Restangular.all('boards').getList()
      .then(function(boards) {
        return angular.copy(boards, _boards);
      });
  };

  var update = function(boardParams, current) {
    return current.patch(boardParams).then(function(updatedBoard) {
      var toUpdate = _.find(_boards, function(board) {
        return board.id === updatedBoard.id
      })
      return angular.copy(updatedBoard, toUpdate)
    });
  }

  var getBoards = function() {
    if (_boards.length) {
      return _boards;
    } else {
      return populateBoards();
    }
  }

  var create = function(boardParams) {
    return Restangular.all('boards').post(boardParams)
      .then(function(board) {
        _boards.push(board);
      })
  }

  var find = function(id) {
    for (var i = 0; i < _boards.length; i++) {
      if (_boards[i].id == id) {
        return _boards[i];
      }
    }
  };

  var destroy = function(board) {
    return board.remove()
      .then(function(deadBoard) {
        _.remove(_boards, function(item) {
          return item.id === deadBoard.id
        });
      });
  };

  return {
    populateBoards: populateBoards,
    create: create,
    find: find,
    destroy: destroy,
    getBoards: getBoards,
    update: update
  }

}]);
