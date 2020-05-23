Rails.application.routes.draw do
  resource :users, only: %i[create update destroy]
  resources :clients do
    resource :tours
  end
  resources :advisories
  resources :booked_tours
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
