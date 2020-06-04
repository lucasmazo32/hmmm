# frozen_string_literal: true

class ToursController < ApplicationController
  def index
    if params[:api_key].nil?
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end

    if !params[:city].nil?
      tours = Tour.where(city: params[:city])
      json_response(tours.as_json(only: %i[id description city]))
    elsif !params[:client].nil?
      tours = Tour.where(client_id: params[:client])
      json_response(tours.as_json(only: %i[id description city]))
    elsif !params[:arr].nil?
      tours = Tour.all
      tourArr = []
      tours.each do |tour|
        tourArr.include?(tour.city) ? nil : tourArr << tour.city
      end
      json_response({ tourArr: tourArr })
    end
  end

  def create
    if params[:api_key].nil?
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end

    tour = Tour.create!(tour_params)
    json_response(tour, :created)
  end

  def destroy
    if params[:api_key].nil?
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end

    tour = Tour.find_by(id: params[:id])
    client = Tour.client
    if client&.authenticate(params[:password])
      tour.destroy
      json_response({ Message: 'Tour deleted.' })
    else
      json_response({ Message: 'Sorry, the password is incorrect.' })
    end
  end

  def update
    if params[:api_key].nil?
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end

    tour = Tour.find_by(id: params[:id])
    client = Tour.client
    if client&.authenticate(params[:password])
      json_response(tour) if tour.update(tour_params)
    else
      json_response({ Message: 'Sorry, the password is incorrect.' })
    end
  end

  def show
    if params[:api_key].nil?
      return json_response({ Message: 'No api key given' })
    else
      return json_response({ Message: 'Wrong api key' }) unless validates_key
    end

    tour = Tour.includes(:client).find_by(id: params[:id])
    client = tour.client
    json_response({ tour: tour, client: client.as_json(only: %i[id email company_name company_logo]) })
  end

  private

  def tour_params
    params.permit(:country, :city, :description, :max_capacity, :cost, :hour, :duration, :client_id)
  end

  def validates_key
    apiAll = params[:api_key]
    apiKey = apiAll[1, 20]
    apiId = apiAll[0]
    Apikey.find(apiId).authenticate_key(apiKey)
  end
end
