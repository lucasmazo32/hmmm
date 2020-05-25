class Apikey < ApplicationRecord
  has_secure_password :key
end
