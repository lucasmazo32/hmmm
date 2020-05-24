class SessionsController < ApplicationController
  def create
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
end
