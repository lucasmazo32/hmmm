# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tour, type: :model do
  context 'must have all field' do
    it 'must have a valid name' do
      client = Client.first
      tour = Tour.new(client: client, country: 'Foo', city: 'Foobar', description: 'foo bar', max_capacity: 20, cost: 30, hour: 13, duration: 3)
      expect(tour.valid?).to be(true)
    end
  end
end
