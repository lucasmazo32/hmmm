# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Bookedtours', type: :request do
  context 'GET /booked_tours' do
    it 'gives me the info related to user info' do
      booked_tour = Bookedtour.first
      get booked_tours_path, params: { api_key: '178d2cab729f1b69ad3d2', user: booked_tour.user_id }
      expect(response.body).to include('dif_booked', 'booked_tours', 'booked_info')
    end

    it 'gives me the info related to client info' do
      booked_tour = Bookedtour.first
      tour = booked_tour.tour
      get booked_tours_path, params: { api_key: '178d2cab729f1b69ad3d2', client: tour.client_id }
      expect(response.body).to include('{')
    end

    it 'gives me the info related to tour info' do
      booked_tour = Bookedtour.first
      get booked_tours_path, params: { api_key: '178d2cab729f1b69ad3d2', tour: booked_tour.tour_id }
      expect(response.body).to include('booked_tours', 'tour_info')
    end
  end

  context 'CREATE /booked_tours' do
    it 'creates a new booked tour entry' do
      post booked_tours_path, params: { api_key: '178d2cab729f1b69ad3d2', user_id: 1, tour_id: 1, quantity: 5, day: Date.tomorrow.iso8601 }
      expect(response.body).to include('id', 'tour_id', 'day', 'quantity', 'created_at')
    end
  end
end
