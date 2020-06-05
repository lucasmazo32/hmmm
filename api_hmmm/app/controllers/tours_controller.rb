# frozen_string_literal: true

class ToursController < ApplicationController
  before_action :set_tour, only: %i[show destroy update]

  def index
    return if api_key(params[:api_key])

    if !params[:city].nil?
      tours = Tour.where(city: params[:city])
      json_response(tours.as_json(only: %i[id description city]))
    elsif !params[:client].nil?
      tours = Tour.where(client_id: params[:client])
      json_response(tours.as_json(only: %i[id description city]))
    elsif !params[:arr].nil?
      tours = Tour.all
      tour_arr = []
      tours.each do |tour|
        tour_arr.include?(tour.city) ? nil : tour_arr << tour.city
      end
      json_response({ tourArr: tour_arr })
    end
  end

  def create
    return if api_key(params[:api_key])

    tour = Tour.create!(tour_params)
    json_response(tour, :created)
  end

  def destroy
    return if api_key(params[:api_key])

    client = @tour.client
    if client&.authenticate(params[:password])
      tour.destroy
      json_response({ Message: 'Tour deleted.' })
    else
      json_response({ Message: 'Sorry, the password is incorrect.' })
    end
  end

  def update
    return if api_key(params[:api_key])

    client = @tour.client
    if client&.authenticate(params[:password])
      json_response(@tour) if @tour.update(tour_params)
    else
      json_response({ Message: 'Sorry, the password is incorrect.' })
    end
  end

  def show
    return if api_key(params[:api_key])

    client = @tour.client
    json_response({ tour: @tour, client: client.as_json(only: %i[id email company_name company_logo]) })
  end

  private

  def tour_params
    params.permit(:country, :city, :description, :max_capacity, :cost, :hour, :duration, :client_id)
  end

  def set_tour
    @tour = Tour.includes(:client).find_by(id: params[:id])
  end
end
