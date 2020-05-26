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
end
