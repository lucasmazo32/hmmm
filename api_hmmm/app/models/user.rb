class User < ApplicationRecord
  has_many :advisories
  has_many :bookedtours
  has_secure_password
  validates :name, presence: true, length: { in: 3..20 }
  VALID_USER = /\A[\w\d]+\z/i
  validates :username, presence: true, uniqueness: { case_sensitive: false }, length: { in: 4..20 }, format: { with: VALID_USER, message: "can only have numbers and letters" }
  validates :password, presence: true, length: { in: 6..20 }
  validates :password_confirmation, presence: true, length: { in: 6..20 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: VALID_EMAIL_REGEX }

  def tours_going
    Bookedtour.select('bookedtours.id, bookedtours.day, bookedtours.quantity, bookedtours.tour_id, tours.city, tours.country, tours.hour, tours.duration').joins(:tour).where("user_id = ? AND day >= ?", id, Date.today).order(day: :asc)
  end
end
