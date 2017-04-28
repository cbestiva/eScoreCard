class CreateHoles < ActiveRecord::Migration[5.0]
  def change
    create_table :holes do |t|
      t.integer :number
      t.integer :par
      t.integer :yards
      t.string :swings
      t.integer :putt_count
      t.string :score

      t.timestamps
    end
  end
end
