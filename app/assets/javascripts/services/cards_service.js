Djello.factory('CardsService', ['_', 'Restangular', '$rootScope', function(_, Restangular, $rootScope) {

  var _cards = {};

  var populateCards = function() {
    return Restangular.all('cards').getList()
      .then(function(cards) {
        var tempCards = {};
        cards.forEach(function(card) {
          if (!tempCards[card.list_id]) {
            tempCards[card.list_id] = [];
          }
          tempCards[card.list_id].push(card)
        })
        return angular.copy(tempCards, _cards);
      })
  };

  var getCards = function() {
    if (_.isEmpty(_cards)) {
      return populateCards();
    } else {
      return _cards;
    }
  };

  var create = function(cardParams) {
    return Restangular.all('cards').post(cardParams)
      .then(function(card) {
        _addCard(card)
        return card
      })
  };

  var _addCard = function(card) {
    if (!_cards[card.list_id]) {
      _cards[card.list_id] = []
    }
    return _cards[card.list_id].push(card)
  }

  var update = function(cardParams, card) {
    return card.patch(cardParams).then(function(updatedCard) {
      var toChange = _.find(_cards[updatedCard.list_id], function(cardInList) {
        return cardInList.id === updatedCard.id;
      });
      return angular.copy(updatedCard, toChange);
    });
  }

  return {
    populateCards: populateCards,
    getCards: getCards,
    create: create,
    update: update
  }

}])
