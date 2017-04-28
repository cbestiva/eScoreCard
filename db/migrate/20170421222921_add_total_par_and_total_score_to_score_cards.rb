class AddTotalParAndTotalScoreToScoreCards < ActiveRecord::Migration[5.0]
  def change
    add_column :score_cards, :total_par, :integer
    add_column :score_cards, :total_score, :string
  end
end
