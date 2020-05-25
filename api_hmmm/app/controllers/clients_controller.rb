class ClientsController < ApplicationController
  def index
    if params[:api_key] == nil
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end
    @clients = Client.all
    json_response(@clients.as_json(only: %i[id email company_name company_logo]))
  end

  def show
    if params[:api_key] == nil
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end
    @client = Client.find_by(id: params[:id])
    json_response(@client.as_json(only: %i[id email company_name company_logo]))
  end

  def create
    if params[:api_key] == nil
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end
    @client = Client.create!(client_params)
    json_response(@client, :created)
  end

  def destroy
    if params[:api_key] == nil
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end
    client = Client.find_by(id: params[:id])
    if client&.authenticate(params[:password])
      client.destroy
      json_response({ Message: "Client deleted." })
    else
      json_response({ Message: "Sorry, the password is incorrect." })
    end
  end

  def update
    if params[:api_key] == nil
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end
    client = Client.find_by(id: params[:id])
    if client&.authenticate(params[:client_password])
      if client.update(client_params)
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

  def validates_key
    apiAll = params[:api_key]
    apiKey = apiAll[1, 20]
    apiId = apiAll[0]
    return Apikey.find(apiId).authenticate_key(apiKey)
  end
end
