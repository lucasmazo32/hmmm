class UsersController < ApplicationController
  def create
    @user = User.create!(user_params)
    json_response(@user, :created)
  end

  def destroy
    user = User.find_by(id: params[:user_id])
    if user&.authenticate(params[:password])
      user.destroy
      json_response({ Message: "User deleted." })
    else
      json_response({ Message: "Sorry, the password is incorrect." })
    end
  end

  def update
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
end
