require 'rails_helper'

RSpec.describe "Clients", type: :request do
  context "GET /clients" do
    it "get clients" do
      get clients_path, params: { api_key: '18df5e5622382e371cdd1' }
      expect(response.body).to include("[{\"id\":1")
    end

    it "get clients array if requested" do
      get clients_path, params: { api_key: '18df5e5622382e371cdd1', arr: 'true' }
      expect(response.body).to include("{\"clientArr\":[")
    end
  end

  context 'SHOW /clients/:id' do
    it 'get the client info' do
      get client_path(1), params: { api_key: '18df5e5622382e371cdd1' }
      expect(response.body).to include("1", "company_name", "company_logo")
    end

    it 'get client tours' do
      get client_path(1), params: { api_key: '18df5e5622382e371cdd1', tour: 'true' }
      expect(response.body).to include("city", "cost", "id")
    end
  end
end
