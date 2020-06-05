# frozen_string_literal: true

class Bookedtour < ApplicationRecord
  scope :dif_user, -> { group(:user_id).count }
  scope :count_user, -> { select('user_id, sum(quantity)').group(:user_id).order(user_id: :desc) }
  scope :booked_no_date, -> { select('tour_id, sum(quantity)').group(:tour_id).order(tour_id: :desc) }
  scope :booked_date, ->(date) { where(day: date).select('tour_id, sum(quantity)').group(:tour_id).order(tour_id: :desc) }

  belongs_to :user
  belongs_to :tour
  validates :quantity, presence: true, numericality: { only_integer: true }
  validates :day, presence: true
end
