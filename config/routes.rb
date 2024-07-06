Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")

  # root 'pages#index'
  root 'videos#index'

  # get 'home', to: 'pages#home'


  # resources :home



    # root 'pages#home'
    # root "pages#index"

    get 'camera', to: 'pages#camera'
    get 'camera_broadcast', to: 'pages#camera_broadcast'
    get 'user', to: 'pages#user'
    get 'user', to: 'pages#record'
    # Route for video history page
    get 'video-history', to: 'pages#video_history'


    # mount ActionCable.server => '/cable'
    #resources :videos, only: [:create]
    #mount ActionCable.server => '/cable'
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

    # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
    # Can be used by load balancers and uptime monitors to verify that the app is live.
    #get "up" => "rails/health#show", as: :rails_health_check

  # Resources for videos
  resources :videos, only: [:index, :show, :edit, :update, :destroy]


   # API routes for videos
  namespace :api do
    resources :videos, only: [:index, :update, :destroy]
  end
end
