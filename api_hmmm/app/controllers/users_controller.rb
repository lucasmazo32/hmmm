# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :set_user, only: %i[show destroy update]

  def create
    return if api_key(params[:api_key])

    @user = User.create!(user_params)
    json_response(@user, :created)
  end

  def show
    return if api_key(params[:api_key])

    json_response(@user.as_json(only: %i[id name email username]))
  end

  def destroy
    return if api_key(params[:api_key])

    if @user&.authenticate(params[:password])
      @user.destroy
      json_response({ Message: 'User deleted.' })
    else
      json_response({ Message: 'Sorry, the password is incorrect.' })
    end
  end

  def update
    return if api_key(params[:api_key])

    if @user&.authenticate(params[:user_password])
      json_response(@user.as_json(only: %i[id email username name])) if @user.update(user_params)
    else
      json_response({ Message: 'Sorry, the password is incorrect.' })
    end
  end

  private

  def user_params
    params.permit(:name, :email, :username, :password, :password_confirmation)
  end

  def set_user
    @user = User.find_by(id: params[:id])
  end
end
