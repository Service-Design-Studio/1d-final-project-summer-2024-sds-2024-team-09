Rails.application.routes.draw do
  root 'pages#index'

  get 'camera', to: 'pages#camera'
  get 'camera_broadcast', to: 'pages#camera_broadcast'
  get 'user', to: 'pages#user'
  get 'record', to: 'pages#record'

  resources :videos, only: [:index, :edit, :update, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :videos
  end
end
