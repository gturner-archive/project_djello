class BoardsController < ApplicationController

  def index
    @boards = current_user.boards
    respond_to do |format|
      format.json { render json: @boards }
    end
  end

  def create
    @board = Board.new(board_params)
    if @board.save
      @board.users << current_user
      respond_to do |format|
        format.json { render json: @board }
      end
    end
  end

  def destroy
    @board = Board.find(params[:id])
    @board.destroy
    respond_to do |format|
      format.json { render json: @board }
    end
  end

  def update
    @board = Board.find(params[:id])
    if @board.update(board_params)
      respond_to do |format|
        format.json { render json: @board }
      end
    end
  end

  private

    def board_params
      params.require(:board).permit(:title)
    end

end
