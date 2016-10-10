class ActivitiesController < ApplicationController

  def index
    @card = Card.find(params[:card_id])
    @activities = @card.activities
    respond_to do |format|
      format.json { render json: @activities, include: :user }
    end
  end

  def create
    params['activity']['user_id'] = current_user.id
    params['activity']['card_id'] = params[:card_id]
    @activity = Activity.new(activity_params)
    if @activity.save
      respond_to do |format|
        format.json { render json: @activity, include: :user }
      end
    end
  end

  private

    def activity_params
      params.require(:activity).permit(:description, :user_id, :card_id)
    end

end
