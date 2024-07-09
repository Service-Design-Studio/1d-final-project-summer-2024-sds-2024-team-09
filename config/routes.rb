Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  root 'pages#index'

  # get 'home', to: 'pages#home'


  # resources :home



    # root 'pages#home'
    # root "pages#index"

    get 'camera', to: 'pages#camera'
  
    get 'camera_broadcast', to: 'pages#camera_broadcast'
  
    get 'user', to: 'pages#user'

    get 'user', to: 'pages#record'
  
    # mount ActionCable.server => '/cable'
    #resources :videos, only: [:create]
    #mount ActionCable.server => '/cable'
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
    # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
    # Can be used by load balancers and uptime monitors to verify that the app is live.
    #get "up" => "rails/health#show", as: :rails_health_check
  
    # Defines the root path route ("/")
    # root "posts#index"
    #root 'pages#index'
    #mount ActionCable.server => '/cable'
  
  
    #######################
    # JYA PART - SPRINT 2 #
    #######################
    # resources :videos, only: [:new, :create, :show, :index]
    # root "videos#index"
end
