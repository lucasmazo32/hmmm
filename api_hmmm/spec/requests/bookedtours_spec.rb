# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Bookedtours', type: :request do
  context 'GET /booked_tours' do
    before(:all) do
      @booked_tour = Bookedtour.first
    end

    def get_booked(param, param_value)
      my_params = { api_key: '178d2cab729f1b69ad3d2' }
      my_params[param] = param_value
      get booked_tours_path, params: my_params
      response.body
    end

    it 'gives me the info related to user info' do
      expect(get_booked('user', @booked_tour.user_id)).to include('dif_booked', 'booked_tours', 'booked_info')
    end

    it 'gives me the info related to client info' do
      tour = @booked_tour.tour
      expect(get_booked('client', tour.client_id)).to include('{')
    end

    it 'gives me the info related to tour info' do
      expect(get_booked('tour', @booked_tour.tour_id)).to include('booked_tours', 'tour_info')
    end
  end

  context 'CREATE /booked_tours' do
    it 'creates a new booked tour entry' do
      post booked_tours_path, params: { api_key: '178d2cab729f1b69ad3d2', user_id: 1, tour_id: 1, quantity: 5, day: Date.tomorrow.iso8601 }
      expect(response.body).to include('id', 'tour_id', 'day', 'quantity', 'created_at')
    end
  end
end
