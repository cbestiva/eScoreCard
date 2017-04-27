class AddParsAndScoresToScoreCards < ActiveRecord::Migration[5.0]
  def change
    add_column :score_cards, :pars, :integer, array: true, default: '{}'
    add_column :score_cards, :scores, :integer, array: true, default: '{}'
  end
end
