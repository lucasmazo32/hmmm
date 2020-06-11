# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  context 'User must have all fields' do
    user = User.new(name: 'Foobar', username: 'foobar', email: 'foo@bar.com', password: 'foobar', password_confirmation: 'foobar')
    it 'must have a name, username, email, password' do
      expect(user.valid?).to be(true)
    end

    it 'must have a name between 3 and 20 characters' do
      user.name = 'fo'
      expect(user.valid?).to be(false)
    end

    it 'must have a name between 3 and 20 characters' do
      user.name = 'foobarfoobarfoobarfoobarfoobar'
      expect(user.valid?).to be(false)
    end

    it 'Username can only have letters and numbers, no spaces' do
      user.username = 'foo bar'
      expect(user.valid?).to be(false)
    end

    it 'Username can only have letters and numbers, no special characters' do
      user.username = 'foo+bar'
      expect(user.valid?).to be(false)
    end
  end
end
