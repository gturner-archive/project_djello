class CardsController < ApplicationController

  def index
    @cards = current_user.cards
    respond_to do |format|
      format.json { render json: @cards }
    end
  end

end
