# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users, only: %i[show create update destroy]
  resources :clients, only: %i[index show create destroy update]
  resources :tours, only: %i[index show create destroy update]
  resources :booked_tours, only: %i[index create]
  post '/login', to: 'sessions#create'
end
