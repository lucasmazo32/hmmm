class Tour < ApplicationRecord
  belongs_to :client
  has_many :bookedtours
  validates :country, presence: true
  validates :city, presence: true
  validates :description, presence: true
  validates :max_capacity, presence: true, numericality: { only_integer: true }
  validates :cost, presence: true
  validates :hour, presence: true
  validates :duration, presence: true

  def info
    Bookedtour.select('users.username AS user_username, bookedtours.day, bookedtours.quantity').joins(:user).where("tour_id = ? AND day >= ?", id, Date.today)
  end
end
