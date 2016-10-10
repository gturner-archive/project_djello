Djello.factory('CardsService', ['_', 'Restangular', '$rootScope', 'ActivityService', 'SubscriptionsService', '$q', function(_, Restangular, $rootScope, ActivityService, SubscriptionsService, $q) {

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
        console.log('called populate')
        return angular.copy(tempCards, _cards);
      })
  };

  var getCards = function() {
    if (_.isEmpty(_cards)) {
      return populateCards();
    } else {
      return $q(function(resolve) {
        resolve(_cards);
      })
    }
  };

  var create = function(cardParams) {
    return Restangular.all('cards').post(cardParams)
      .then(function(card) {
        _addCard(card)
        ActivityService.createActivity(card.id, {description: "created card at " + new Date(card.created_at).toDateString()})
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
    return Restangular.one('cards', card.id).patch(cardParams).then(function(updatedCard) {
      _createActivity(updatedCard, card);
      var toChange = _.find(_cards[updatedCard.list_id], function(cardInList) {
        return cardInList.id === updatedCard.id;
      });
      SubscriptionsService.updateSubscription(updatedCard);
      return angular.copy(updatedCard, toChange);
    });
  };

  var _createActivity = function(updatedCard, card) {
    if (updatedCard.title !== card.title) {
      ActivityService.createActivity(updatedCard.id, {description: "updated title " + " to " + updatedCard.title })
    } else if (updatedCard.description !== card.description) {
      ActivityService.createActivity(updatedCard.id, {description: "updated description" + " to " + updatedCard.description })
    }
  }

  var deleteCard = function(card) {
    Restangular.one('cards', card.id).remove()
      .then(function(deletedCard) {
        SubscriptionsService.deleteSubscription(deletedCard);
        if (_cards[deletedCard.list_id]) {
          for (var i = 0; i < _cards[deletedCard.list_id].length; i++)  {
            if (_cards[deletedCard.list_id][i].id === deletedCard.id) {
              _cards[deletedCard.list_id].splice(i, 1);
              break;
            }
          }
        }
      });
  }

  return {
    populateCards: populateCards,
    getCards: getCards,
    create: create,
    update: update,
    deleteCard: deleteCard
  }

}])
