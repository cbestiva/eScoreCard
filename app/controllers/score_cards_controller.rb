class ScoreCardsController < ApplicationController
  def create
    @score_card = current_user.score_cards.create(score_card_params)

    respond_to do |f|
      f.html {redirect_to current_user_path(current_user)}
      f.json {render json: @score_card}
    end
  end

  def show
    @score_card= current_user.score_cards.find(params[:id])

    respond_to do |f|
    f.json {render json: @score_card.as_json(include: :holes)}
    end
  end

  def update
    @score_card = ScoreCard.find(params[:id])
    @score_card.update_attributes(score_card_params)

    respond_to do |f|
      f.json {render json: @score_card, status: 200}
    end
  end

  def destroy
    @score_card = ScoreCard.find(params[:id])
    @score_card.delete

    respond_to do |f|
      f.json {render json: @score_card, status: 200}
    end
  end

  private
    # Using a private method to encapsulate the permissible parameters
    # is just a good pattern since you'll be able to reuse the same
    # permit list between create and update. Also, you can specialize
    # this method with per-user checking of permissible attributes.
    def score_card_params
      params.require(:score_card).permit(:course_name, :city, :state, :num_of_holes, :pars, :scores, :total_par, :total_score, :user_id)
    end
end
