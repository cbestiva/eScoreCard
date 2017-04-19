class CreateScoreCards < ActiveRecord::Migration[5.0]
  def change
    create_table :score_cards do |t|
      t.string :course_name
      t.string :city
      t.string :state
      t.integer :num_of_holes

      t.timestamps
    end
  end
end
