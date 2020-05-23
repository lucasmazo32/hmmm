class CreateClients < ActiveRecord::Migration[6.0]
  def change
    create_table :clients do |t|
      t.string :company_name
      t.string :company_logo
      t.string :email
      t.string :password_digest

      t.timestamps
    end
  end
end
