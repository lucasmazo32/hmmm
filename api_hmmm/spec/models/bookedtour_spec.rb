require 'rails_helper'

RSpec.describe Bookedtour, type: :model do
  context 'must have a valid user and tour' do
    it 'must be valid' do
      tour = Tour.first
      user = User.first
      bookedtour = Bookedtour.new(user: user, tour: tour, quantity: 20, day: '2020-06-01')
      expect(bookedtour.valid?).to be(true)
    end
  end
end
