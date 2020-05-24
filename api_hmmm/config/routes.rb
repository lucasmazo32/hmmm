Rails.application.routes.draw do
  resources :users, only: %i[create update destroy]
  resources :clients, only: %i[index show create destroy update]
  resources :tours, only: %i[index show create destroy update]
  resources :advisories
  resources :booked_tours
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
