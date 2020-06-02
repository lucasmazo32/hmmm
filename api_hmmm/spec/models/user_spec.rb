require 'rails_helper'

RSpec.describe User, type: :model do
  context 'User must have all fields' do
    it 'must have a name, username, email, password' do
      user = User.new(name: 'Foobar', username: 'foobar', email: 'foo@bar.com', password: 'foobar', password_confirmation: 'foobar')
      expect(user.valid?).to be(true)
    end

    it 'must have a name between 3 and 20 characters' do
      user = User.new(name: 'fo', username: 'foobar', email: 'foo@bar.com', password: 'foobar', password_confirmation: 'foobar')
      expect(user.valid?).to be(false)
    end

    it 'must have a name between 3 and 20 characters' do
      user = User.new(name: 'foobarfoobarfoobarfoobarfoobar', username: 'foobar', email: 'foo@bar.com', password: 'foobar', password_confirmation: 'foobar')
      expect(user.valid?).to be(false)
    end

    it 'Username can only have letters and numbers, no spaces' do
      user = User.new(name: 'Foobar', username: 'foo bar', email: 'foo@bar.com', password: 'foobar', password_confirmation: 'foobar')
      expect(user.valid?).to be(false)
    end

    it 'Username can only have letters and numbers, no spaces' do
      user = User.new(name: 'Foobar', username: 'foo+bar', email: 'foo@bar.com', password: 'foobar', password_confirmation: 'foobar')
      expect(user.valid?).to be(false)
    end
  end
end
