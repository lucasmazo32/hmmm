# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', type: :request do
  context 'SHOW /users/:id' do
    it 'get user information' do
      get user_path(1), params: { api_key: '178d2cab729f1b69ad3d2' }
      expect(response.body).to include('id', '1', 'name', 'username', 'email')
    end
  end

  context 'CREATE /users' do
    before(:all) do
      @user = User.last
    end

    it 'creates user' do
      post users_path, params: { api_key: '178d2cab729f1b69ad3d2', name: 'foobar', username: "foobar#{@user.id + 1}",
                                 email: "foo#{@user.id + 1}@bar.com", password: 'foobar', password_confirmation: 'foobar' }
      expect(response.body).to include('id', (@user.id + 1).to_s, 'name', 'username', 'email')
    end

    it 'return message of errors' do
      post users_path, params: { api_key: '178d2cab729f1b69ad3d2', username: "foobar#{@user.id + 1}",
                                 email: "foo#{@user.id + 1}@bar.com", password: 'foobar', password_confirmation: 'foobar' }
      expect(response.body).to include('Validation failed')
    end
  end
end
