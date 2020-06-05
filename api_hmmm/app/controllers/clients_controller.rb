# frozen_string_literal: true

class ClientsController < ApplicationController
  def index
    return if api_key(params[:api_key])

    @clients = Client.all
    if params[:arr] === 'true'
      clientArr = []
      @clients.each do |client|
        clientArr << { name: client.company_name, id: client.id }
      end
      return json_response({ clientArr: clientArr })
    end
    json_response(@clients.as_json(only: %i[id email company_name company_logo]))
  end

  def show
    return if api_key(params[:api_key])

    @client = Client.find_by(id: params[:id])
    if !params[:tour].nil?
      tours = @client.tours
      json_response(tours.as_json(only: %i[id city cost]))
    else
      json_response(@client.as_json(only: %i[id email company_name company_logo]))
    end
  end

  def create
    return if api_key(params[:api_key])

    @client = Client.create!(client_params)
    json_response(@client, :created)
  end

  def destroy
    return if api_key(params[:api_key])

    client = Client.find_by(id: params[:id])
    if client&.authenticate(params[:password])
      client.destroy
      json_response({ Message: 'Client deleted.' })
    else
      json_response({ Message: 'Sorry, the password is incorrect.' })
    end
  end

  def update
    return if api_key(params[:api_key])

    client = Client.find_by(id: params[:id])
    if client&.authenticate(params[:client_password])
      json_response(client.as_json(only: %i[id email company_name company_logo])) if client.update(client_params)
    else
      json_response({ Message: 'Sorry, the password is incorrect.' })
    end
  end

  private

  def client_params
    params.permit(:company_name, :company_logo, :email, :password, :password_confirmation)
  end
end
