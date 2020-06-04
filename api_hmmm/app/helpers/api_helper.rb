# frozen_string_literal: true

# Api helper for the controllers to validate API key
module ApiHelper
  def api_key(api)
    if api.nil?
      json_response({ Message: 'No api key given' })
      return true
    else
      unless validates_key
        json_response({ Message: 'Wrong api key' })
        return true
      end
    end
    false
  end

  def validates_key
    api_all = params[:api_key]
    api_key = api_all[1, 20]
    api_id = api_all[0]
    Apikey.find(api_id).authenticate_key(api_key)
  end
end
