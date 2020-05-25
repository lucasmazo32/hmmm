class UsersController < ApplicationController
  def create
    if params[:api_key] == nil
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end
    @user = User.create!(user_params)
    json_response(@user, :created)
  end

  def destroy
    if params[:api_key] == nil
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end
    user = User.find_by(id: params[:user_id])
    if user&.authenticate(params[:password])
      user.destroy
      json_response({ Message: "User deleted." })
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
    user = User.find_by(id: params[:user_id])
    if user&.authenticate(params[:user_password])
      if user.update_attributes(user_params)
        json_response(user.as_json(only: %i[id email username name]))
      end
    else
      json_response({ Message: "Sorry, the password is incorrect." })
    end
  end

  private

  def user_params
    params.permit(:name, :email, :username, :password, :password_confirmation)
  end

  def validates_key
    apiAll = params[:api_key]
    apiKey = apiAll[1, 20]
    apiId = apiAll[0]
    return Apikey.find(apiId).key.is_password?(apiKey)
  end
end
