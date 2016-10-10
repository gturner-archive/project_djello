class CardsController < ApplicationController

  def index
    @cards = current_user.cards
    respond_to do |format|
      format.json { render json: @cards }
    end
  end

  def create
    @card = Card.new(card_params)
    if @card.save
      respond_to do |format|
        format.json { render json: @card }
      end
    end
  end

  def update
    @card = Card.find(params[:id])
    if @card.update(card_params)
      respond_to do |format|
        format.json { render json: @card }
      end
    end
  end

  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    respond_to do |format|
      format.json { render json: @card }
    end
  end

  private

    def card_params
      params.require(:card).permit(:title, :description, :list_id, :completed)
    end

end
