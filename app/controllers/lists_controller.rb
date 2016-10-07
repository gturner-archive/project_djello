class ListsController < ApplicationController

  def index
    @lists = current_user.lists
    respond_to do |format|
      format.json { render json: @lists }
    end
  end

  def create
    @list = List.new(list_params)
    if @list.save
      respond_to do |format|
        format.json { render json: @list }
      end
    end
  end

  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      respond_to do |format|
        format.json { render json: @list }
      end
    end
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    respond_to do |format|
      format.json { render json: @list }
    end
  end

  private

    def list_params
      params.require(:list).permit(:title, :description, :board_id)
    end

end
