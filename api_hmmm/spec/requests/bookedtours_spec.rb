require 'rails_helper'

RSpec.describe "Bookedtours", type: :request do
  describe "GET /bookedtours" do
    it "works! (now write some real specs)" do
      get bookedtours_path
      expect(response).to have_http_status(200)
    end
  end
end
