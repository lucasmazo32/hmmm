# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tours', type: :request do
  context 'GET /tours' do
    it 'get all tour names' do
      get tours_path, params: { api_key: '178d2cab729f1b69ad3d2', arr: 'true' }
      expect(response.body).to include('tourArr')
    end

    it 'get all tour by client' do
      tour = Tour.first
      get tours_path, params: { api_key: '178d2cab729f1b69ad3d2', client: tour.client_id }
      expect(response.body).to include('id', 'description', 'city')
    end

    it 'get all tour by city' do
      tour = Tour.first
      get tours_path, params: { api_key: '178d2cab729f1b69ad3d2', city: tour.city }
      expect(response.body).to include('id', 'description', 'city')
    end
  end

  context 'SHOW /tours/:id' do
    it 'shows tour and client information' do
      get tour_path(1), params: { api_key: '178d2cab729f1b69ad3d2' }
      expect(response.body).to include('tour', 'client')
    end
  end
end
