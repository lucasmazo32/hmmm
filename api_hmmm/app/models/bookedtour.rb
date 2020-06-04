# frozen_string_literal: true

class Bookedtour < ApplicationRecord
  belongs_to :user
  belongs_to :tour
  validates :quantity, presence: true, numericality: { only_integer: true }
  validates :day, presence: true
end
