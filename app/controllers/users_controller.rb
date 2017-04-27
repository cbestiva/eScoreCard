class UsersController < ApplicationController
  def show
    @user = current_user
    @scoreCards = current_user.score_cards.all.order('created_at DESC');
    @scoreCard = {
      course_name: '',
      city: '',
      state: '',
      num_of_holes: '',
      user_id: @user.id,
      pars: [],
      scores: [],
      total_par: 0,
      total_score: 0
    }

    respond_to do |f|
      f.html
      f.json {render json: @user.as_json(include: :score_cards)}
    end
  end

end