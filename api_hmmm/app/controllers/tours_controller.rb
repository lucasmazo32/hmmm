class ToursController < ApplicationController
  def index
    if params[:city] != nil    
      tours = Tour.where(city: params[:city].capitalize)
      json_response(tours.as_json(only: %i[id description city]))
    else
      tours = Tour.where(client_id: params[:client_id])
      json_response(tours.as_json(only: %i[id description city]))
    end
  end

  def create
    tour = Tour.create!(tour_params)
    json_response(tour, :created)
  end
  
  def destroy
    tour = Tour.find_by(id: params[:id])
    client = Tour.client
    if client&.authenticate(params[:password]) 
      tour.destroy
      json_response({ Message: "Tour deleted." })
    else
      json_response({ Message: "Sorry, the password is incorrect." })
    end
  end

  def update
    tour = Tour.find_by(id: params[:id])
    client = Tour.client
    if client&.authenticate(params[:password])
      if tour.update_attributes(tour_params)
        json_response(tour)
      end
    else
      json_response({ Message: "Sorry, the password is incorrect." })
    end
  end

  def show
    tour = Tour.find_by(id: params[:id])
    json_response(tour)
  end

  private

  def tour_params
    params.permit(:country, :city, :description, :max_capacity, :cost, :hour, :duration, :client_id)
  end
end
