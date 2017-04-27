class AddScoreCardRefToHoles < ActiveRecord::Migration[5.0]
  def change
    add_reference :holes, :score_card, index: true
  end
end
