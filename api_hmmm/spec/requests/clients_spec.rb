# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Clients', type: :request do
  context 'GET /clients' do
    def get_clients(arr = false)
      my_params = { api_key: '178d2cab729f1b69ad3d2' }
      my_params['arr'] = 'true' if arr
      get clients_path, params: my_params
      response.body
    end

    it 'get clients' do
      expect(get_clients).to include('[{"id":1')
    end

    it 'get clients array if requested' do
      expect(get_clients(true)).to include('{"clientArr":[')
    end
  end

  context 'SHOW /clients/:id' do
    def get_clients(tour = false)
      my_params = { api_key: '178d2cab729f1b69ad3d2' }
      my_params['tour'] = 'true' if tour
      get client_path(1), params: my_params
      response.body
    end

    it 'get the client info' do
      expect(get_clients).to include('1', 'company_name', 'company_logo')
    end

    it 'get client tours' do
      expect(get_clients(true)).to include('city', 'cost', 'id')
    end
  end
end
