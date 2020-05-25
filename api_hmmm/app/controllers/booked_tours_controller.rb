class BookedToursController < ApplicationController
  def index
    if params[:user] != nil
      json_response(user_info(params[:user]))
    else
      json_response(tour_info(params[:tour]))
    end
  end

  private

  def user_info(user_id)
    dif_booked = Bookedtour.where(user_id: user_id).group(:user_id).count #Different booked tours
    count_booked = Bookedtour.select('user_id, sum(quantity)').where(user_id: user_id).group(:user_id).order(user_id: :desc) #Number of booked tours
    booked_info = Bookedtour.where(user_id: user_id).select('tour_id, quantity, id')
    return { dif_booked: dif_booked[user_id.to_i], booked_tours: count_booked.first.sum, booked_info: booked_info }
  end

  def tour_info(tour_id)
    booked_tour = Bookedtour.where(tour_id: tour_id).select('tour_id, sum(quantity)').group(:tour_id).order(tour_id: :desc)
    user_info = Bookedtour.where(tour_id: tour_id).select('user_id, quantity, id')
    return { booked_tours: booked_tour.first.sum, user_info: user_info }
  end
end
