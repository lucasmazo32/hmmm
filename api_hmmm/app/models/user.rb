class User < ApplicationRecord
  has_many :advisories
  has_many :bookedtours
  has_secure_password
  validates :name, presence: true
  validates :username, presence: true, uniqueness: { case_sensitive: false }, length: { in: 4..20 }
  validates :password, presence: true, length: { in: 6..20 }
  validates :password_confirmation, presence: true, length: { in: 6..20 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: VALID_EMAIL_REGEX }

  def tours_going
    Bookedtour.select('bookedtours.id, bookedtours.day, bookedtours.quantity, bookedtours.tour_id, tours.city, tours.country, tours.hour, tours.duration').joins(:tour).where(user_id: id)
  end
end
