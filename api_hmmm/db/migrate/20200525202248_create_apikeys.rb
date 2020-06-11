# frozen_string_literal: true

class CreateApikeys < ActiveRecord::Migration[6.0]
  def change
    create_table :apikeys do |t|
      t.string :key_digest

      t.timestamps
    end
  end
end
