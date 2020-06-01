require 'rails_helper'

RSpec.describe "Bookedtours", type: :request do
  context "GET /booked_tours" do
    it "gives me the info related to user info" do
      get booked_tours_path, params: { api_key: '18df5e5622382e371cdd1', user: '1' }
      expect(response.body).to include('dif_booked', 'booked_tours', 'booked_info')
    end
    
    it "gives me the info related to client info" do
      get booked_tours_path, params: { api_key: '18df5e5622382e371cdd1', client: '1' }
      expect(response.body).to include('{')
    end

    it "gives me the info related to user info" do
      bookedTour = Bookedtour.first
      get booked_tours_path, params: { api_key: '18df5e5622382e371cdd1', tour: bookedTour.tour_id }
      expect(response.body).to include('booked_tours', 'user_info')
    end
  end

  context 'CREATE /booked_tours' do
    it 'creates a new booked tour entry' do
      post booked_tours_path, params: { api_key: '18df5e5622382e371cdd1', user_id: 1, tour_id: 1, quantity: 5, day: Date.tomorrow.iso8601 }
      expect(response.body).to include('id', 'tour_id', 'day', 'quantity', 'created_at')
    end
  end
end
