class SubscriptionsController < ApplicationController
  def index
    @cards = current_user.subscribed_cards
    respond_to do |format|
      format.json { render json: @cards }
    end
  end
end
