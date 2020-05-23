class CreateTours < ActiveRecord::Migration[6.0]
  def change
    create_table :tours do |t|
      t.string :country
      t.string :city
      t.text :description
      t.integer :max_capacity
      t.decimal :cost
      t.string :days_a_week
      t.string :hours
      t.decimal :duration
      t.references :client, null: false, foreign_key: true

      t.timestamps
    end
  end
end
