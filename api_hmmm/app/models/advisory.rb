class Advisory < ApplicationRecord
  belongs_to :user
  belongs_to :client
  validates :date, presence: true
end
