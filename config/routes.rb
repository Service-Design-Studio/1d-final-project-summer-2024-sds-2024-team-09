Rails.application.routes.draw do
  get 'videos/index', as: 'history'

  root 'pages#index'

  get 'camera', to: 'pages#camera'
  get 'camera_broadcast', to: 'pages#camera_broadcast'
  get 'user', to: 'pages#user'
  get 'user', to: 'pages#record'

  resources :videos, only: [:index]

  namespace :api, defaults: { format: :json } do
    resources :videos
  end
end
