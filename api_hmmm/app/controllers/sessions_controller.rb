class SessionsController < ApplicationController
  def create
    if params[:api_key] == nil
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end
    if params[:client] == nil
      user = User.find_by(email: params[:email])
      if user&.authenticate(params[:password])
        json_response(user.as_json(only: %i[id username email name]))
      else
        json_response({Message: 'Invalid email/password combination.'})
      end
    else
      client = Client.find_by(email: params[:email])
      if client&.authenticate(params[:password])
        json_response(client.as_json(only: %i[id email company_name company_logo]))
      else
        json_response({Message: 'Invalid email/password combination.'})
      end
    end
  end

  private

  def validates_key
    apiAll = params[:api_key]
    apiKey = apiAll[1, 20]
    apiId = apiAll[0]
    return Apikey.find(apiId).key.is_password?(apiKey)
  end
end
