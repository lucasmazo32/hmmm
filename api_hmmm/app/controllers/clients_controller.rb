class ClientsController < ApplicationController
  def index
    @clients = Client.all
    json_response(@clients.as_json(only: %i[id email company_name company_logo]))
  end

  def show
    @client = Client.find_by(id: params[:id])
    json_response(@client.as_json(only: %i[id email company_name company_logo]))
  end

  def create
    @client = Client.create!(client_params)
    json_response(@client, :created)
  end

  def destroy
    client = Client.find_by(id: params[:client_id])
    if client&.authenticate(params[:password])
      client.destroy
      json_response({ Message: "Client deleted." })
    else
      json_response({ Message: "Sorry, the password is incorrect." })
    end
  end

  def update
    client = Client.find_by(id: params[:client_id])
    if client&.authenticate(params[:client_password])
      if client.update_attributes(client_params)
        json_response(client.as_json(only: %i[id email company_name company_logo]))
      end
    else
      json_response({ Message: "Sorry, the password is incorrect." })
    end
  end

  private

  def client_params
    params.permit(:company_name, :company_logo, :email, :password, :password_confirmation)
  end
end
