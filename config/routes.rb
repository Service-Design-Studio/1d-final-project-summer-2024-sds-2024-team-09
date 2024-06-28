Rails.application.routes.draw do
  # root 'pages#home'

  # get 'camera', to: 'pages#camera'

  # get 'camera_broadcast', to: 'pages#camera_broadcast'

  # get 'user', to: 'pages#user'

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
  # testing #
  #######################
  root 'pages#index'


  resources :movies

  get 'camera', to: 'pages#camera'

  get 'camera_broadcast', to: 'pages#camera_broadcast'

  get 'user', to: 'pages#user'

  get 'user_page', to: 'pages#user', as: 'user_page'

  get 'history', to: 'videos#index'

  get 'record', to: 'pages#record'

  get 'histories', to: 'histories#index'

  resources :histories, only: [:index, :create, :update]
  post 'start_recording', to: 'recordings#start'
  post 'stop_recording', to: 'recordings#stop'

  post 'devices/assign_uid', to: 'devices#assign_uid'

  # #######################
  # # JYA PART - SPRINT 2 #
  # #######################
  resources :videos, only: [:new, :create, :show, :index]
  # root "videos#index"
end
