class ClientsController < ApplicationController
  def index
    @clients = Client.all
    json_response(@clients.as_json(only: %i[id email company_name company_logo]))
  end

  def show
    @client = Client.find_by(id: params[:id])
    json_response(@client)
  end

  def create
    @client = Client.create!(client_params)
    json_response(@client, :created)
  end

  private

  def client_params
    params.permit(:company_name, :company_logo, :email, :password, :password_confirmation)
  end
end
