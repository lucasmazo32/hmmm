# frozen_string_literal: true

class Client < ApplicationRecord
  has_many :tours
  has_many :advisories
  has_secure_password
  validates :company_name, presence: true, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { in: 6..20 }
  validates :password_confirmation, presence: true, length: { in: 6..20 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: VALID_EMAIL_REGEX }

  def tour_arr
    myArr = tours.map(&:id) if tours.any?
  end
end
