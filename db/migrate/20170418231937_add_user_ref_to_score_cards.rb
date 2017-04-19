class AddUserRefToScoreCards < ActiveRecord::Migration[5.0]
  def change
    add_reference :score_cards, :user, index: true
  end
end
