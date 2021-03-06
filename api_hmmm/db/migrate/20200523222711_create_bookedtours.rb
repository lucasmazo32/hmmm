# frozen_string_literal: true

class CreateBookedtours < ActiveRecord::Migration[6.0]
  def change
    create_table :bookedtours do |t|
      t.references :user, null: false, foreign_key: true
      t.references :tour, null: false, foreign_key: true
      t.date :day
      t.integer :quantity

      t.timestamps
    end
  end
end
