Rails.application.routes.draw do
  get 'user_settings/new'
  get 'user_settings/create'
  get 'user_settings/edit'
  get 'user_settings/update'
  root 'pages#index' # Root path for logged-in users
  get 'signup', to: 'users#new'
  post 'signup', to: 'users#create'
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  # Example additional routes
  get 'camera', to: 'pages#camera'
  get 'camera_broadcast', to: 'pages#camera_broadcast'
  get 'user', to: 'pages#user'
  get 'record', to: 'videos#index'
  get 'history', to: 'videos#history'
  

  resources :users, only: [:new, :create, :show]
  resources :posts # Example resource for blog posts
  resource :user_settings, only: [:new, :create, :edit, :update]
  resources :videos, only: [:index, :create, :update, :destroy]
  # get 'api/videos', to: 'videos#api_index'

  namespace :api do
    resources :videos, only: [:index, :destroy, :update]
  end

end
