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

  def show
    tour = Tour.find_by(id: params[:id])
    json_response(tour)
  end
end
