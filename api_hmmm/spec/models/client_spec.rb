# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Client, type: :model do
  context 'must have all fields' do
    it 'must have all fields, except logo' do
      client = Client.new(company_name: 'Foobar', email: 'foo@bar.com', password: 'foobar', password_confirmation: 'foobar')
      expect(client.valid?).to be(true)
    end
  end
end
