# frozen_string_literal: true

# Application controller
class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler
  include ApiHelper
end
