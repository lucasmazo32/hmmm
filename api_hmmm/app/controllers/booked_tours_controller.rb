# frozen_string_literal: true

class BookedToursController < ApplicationController
  def index
    return if api_key(params[:api_key])

    if !params[:user].nil?
      json_response(user_info(params[:user]))
    elsif params[:tour]
      json_response(tour_info(params[:tour], params[:date]))
    else params[:client]
         json_response(client_info(params[:client]))
    end
  end

  def create
    return if api_key(params[:api_key])

    booked = Bookedtour.create!(booked_params)
    json_response(booked, :created)
  end

  private

  def user_info(user_id)
    user_tours = Bookedtour.where(user_id: user_id)
    if !user_tours.first.nil?
      dif_booked = user_tours.dif_user # Different booked tours
      count_booked = user_tours.count_user # Number of booked tours
      { dif_booked: dif_booked[user_id.to_i], booked_tours: count_booked.first.sum, booked_info: User.find(user_id).tours_going.as_json(except: %i[id]) }
    else
      { dif_booked: 0, booked_tours: 0, booked_info: [] }
    end
  end

  def tour_info(tour_id, date)
    tour_books = Bookedtour.where(tour_id: tour_id)
    if !tour_books.first.nil? && date.nil?
      booked_tour = tour_books.booked_no_date
      { booked_tours: booked_tour.first.sum, tour_info: Tour.find(tour_id).info.as_json(except: %i[id]) }
    elsif !tour_books.first.nil? && !date.nil?
      booked_tour = tour_books.booked_date(date)
      return { booked_tours: 0 } if booked_tour.first.nil?

      { booked_tours: booked_tour.first.sum }
    else
      { booked_tours: 0 }
    end
  end

  def client_info(client_id)
    arr = Client.includes(:tours).find(client_id).tour_arr
    hash = {}
    arr.map do |tour_id|
      if !Bookedtour.where(tour_id: tour_id).first.nil?
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
end
