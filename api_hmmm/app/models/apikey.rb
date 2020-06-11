# frozen_string_literal: true

class Apikey < ApplicationRecord
  has_secure_password :key
end
