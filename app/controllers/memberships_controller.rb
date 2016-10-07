class MembershipsController < ApplicationController

  def index
    @members = Card.find(params[:card_id]).subscribed_users
    respond_to do |format|
      format.json { render json: @members, include: :memberships }
    end
  end

  def create
    @member = User.find(params[:id])
    @card = Card.find(params[:card_id])
    @card.subscribed_users << @member
    respond_to do |format|
      format.json { render json: @member, include: :memberships }
    end
  end

  def destroy
    @membership = Membership.find(params[:id])
    @member = @membership.user
    @membership.destroy
    respond_to do |format|
      format.json { render json: @member }
    end
  end

end
