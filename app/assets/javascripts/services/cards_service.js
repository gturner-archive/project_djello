Djello.factory('CardsService', ['_', 'Restangular', function(_, Restangular) {

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
  }

  var getCards = function() {
    if (_.isEmpty(_cards)) {
      return populateCards();
    } else {
      return _cards;
    }
  }

  return {
    populateCards: populateCards,
    getCards: getCards
  }

}])
