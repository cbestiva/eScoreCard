class HolesController < ApplicationController
  def index
    @holes = Hole.all

    respond_to do |f|
      f.json {render json: @holes}
    end
  end

  def show
    @hole = Hole.find(params[:id])

    respond_to do |f|
      f.json {render json: @hole}
    end
  end

  def create
    score_card = ScoreCard.find(params[:score_card_id])
    @hole = score_card.holes.create(hole_params)

    respond_to do |f|
      # f.html {redirect_to current_user_path(current_user)}
      f.json {render json: @hole}
    end
  end

  private
    # Using a private method to encapsulate the permissible parameters
    # is just a good pattern since you'll be able to reuse the same
    # permit list between create and update. Also, you can specialize
    # this method with per-user checking of permissible attributes.
    def hole_params
      params.require(:hole).permit(:number, :par, :yards, :swings, :putt_count, :score, :score_card_id)
    end
end
