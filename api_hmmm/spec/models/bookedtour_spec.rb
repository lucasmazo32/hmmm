require 'rails_helper'

RSpec.describe Bookedtour, type: :model do
  context 'must have a valid user and tour' do
    it 'must be valid' do
      client = Client.create!(company_name: 'Foobar', email: 'foo@bar.com', password: 'foobar', password_confirmation: 'foobar')
      tour = Tour.create!(client: client, country: 'Foo', city: 'Foobar', description: 'foo bar', max_capacity: 20, cost: 30, hour: 13, duration: 3)
      user = User.create!(name: 'Foobar', username: 'foobar', email: 'foo@bar.com', password: 'foobar', password_confirmation: 'foobar')
      bookedtour = Bookedtour.new(user: user, tour: tour, quantity: 20, day: '2020-06-01')
      expect(bookedtour.valid?).to be(true)
    end
  end
end
