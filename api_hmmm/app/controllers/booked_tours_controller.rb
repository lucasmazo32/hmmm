class BookedToursController < ApplicationController
  def index
    if params[:api_key] == nil
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end
    if params[:user] != nil
      json_response(user_info(params[:user]))
    else
      json_response(tour_info(params[:tour]))
    end
  end

  private

  def user_info(user_id)
    if Bookedtour.where(user_id: user_id).first != nil
      dif_booked = Bookedtour.where(user_id: user_id).group(:user_id).count #Different booked tours
      count_booked = Bookedtour.select('user_id, sum(quantity)').where(user_id: user_id).group(:user_id).order(user_id: :desc) #Number of booked tours
      return { dif_booked: dif_booked[user_id.to_i], booked_tours: count_booked.first.sum, booked_info: User.find(user_id).tours_going.as_json(except: %i[id]) }
    else
      return { dif_booked: 0 }
    end
  end

  def tour_info(tour_id)
    if Bookedtour.where(tour_id: tour_id).first != nil
      booked_tour = Bookedtour.where(tour_id: tour_id).select('tour_id, sum(quantity)').group(:tour_id).order(tour_id: :desc)
      user_info = Bookedtour.where(tour_id: tour_id)
      return { booked_tours: booked_tour.first.sum, user_info: user_info.as_json(only: %i[user_id day quantity]) }
    else
      return { booked_tours: 0 }
    end
  end

  def validates_key
    apiAll = params[:api_key]
    apiKey = apiAll[1, 20]
    apiId = apiAll[0]
    return Apikey.find(apiId).authenticate_key(apiKey)
  end
end
