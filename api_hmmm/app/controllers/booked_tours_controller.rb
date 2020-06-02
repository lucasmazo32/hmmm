class BookedToursController < ApplicationController
  def index
    if params[:api_key] == nil
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end
    if params[:user] != nil
      json_response(user_info(params[:user]))
    elsif params[:tour]
      json_response(tour_info(params[:tour], params[:date]))
    else params[:client]
      json_response(client_info(params[:client]))
    end
  end

  def create
    if params[:api_key] == nil
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end
    booked = Bookedtour.create!(booked_params)
    json_response(booked, :created)
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

  def tour_info(tour_id, date)
    if Bookedtour.where(tour_id: tour_id).first != nil && date == nil
      booked_tour = Bookedtour.where(tour_id: tour_id).select('tour_id, sum(quantity)').group(:tour_id).order(tour_id: :desc)
      return { booked_tours: booked_tour.first.sum, user_info: Tour.find(tour_id).info.as_json(except: %i[id]) }
    elsif Bookedtour.where(tour_id: tour_id).first != nil && date != nil
      booked_tour = Bookedtour.where(tour_id: tour_id, day: date).select('tour_id, sum(quantity)').group(:tour_id).order(tour_id: :desc)
      return { booked_tours: 0 } if booked_tour.first == nil
      return { booked_tours: booked_tour.first.sum }
    else
      return { booked_tours: 0 }
    end
  end

  def client_info(client_id)
    arr = Client.includes(:tours).find(client_id).tour_arr
    hash = {}
    arr.map do |tour_id|
      if Bookedtour.where(tour_id: tour_id).first != nil
        hash[tour_id] = Bookedtour.where(tour_id: tour_id).select('tour_id, sum(quantity)').group(:tour_id).order(tour_id: :desc).first.sum
      else
        hash[tour_id] = 0
      end
    end
    hash
  end

  def booked_params
    params.permit(:user_id, :tour_id, :day, :quantity)
  end

  def validates_key
    apiAll = params[:api_key]
    apiKey = apiAll[1, 20]
    apiId = apiAll[0]
    return Apikey.find(apiId).authenticate_key(apiKey)
  end
end
