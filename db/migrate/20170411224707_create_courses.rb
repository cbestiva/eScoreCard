class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.string :city
      t.string :state
      t.integer :number_of_holes

      t.timestamps
    end
  end
end
