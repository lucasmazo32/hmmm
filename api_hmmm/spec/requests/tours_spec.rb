# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tours', type: :request do
  context 'GET /tours' do
    before(:all) do
      @tour = Tour.first
    end

    def get_tours(param, param_value)
      my_params = { api_key: '178d2cab729f1b69ad3d2' }
      my_params[param] = param_value
      get tours_path, params: my_params
      response.body
    end

    it 'get all tour names' do
      expect(get_tours('arr', 'true')).to include('tourArr')
    end

    it 'get all tour by client' do
      expect(get_tours('client', @tour.client_id)).to include('id', 'description', 'city')
    end

    it 'get all tour by city' do
      expect(get_tours('city', @tour.city)).to include('id', 'description', 'city')
    end
  end

  context 'SHOW /tours/:id' do
    it 'shows tour and client information' do
      get tour_path(1), params: { api_key: '178d2cab729f1b69ad3d2' }
      expect(response.body).to include('tour', 'client')
    end
  end
end
