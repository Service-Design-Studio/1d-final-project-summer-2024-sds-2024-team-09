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
  get 'home', to: 'pages#index'

  get 'settings', to: 'user_settings#edit'
  resources :user_settings, only: [:update] do
    delete 'remove_email', on: :member
  end
  

  resources :users, only: [:new, :create, :show]
  resources :posts # Example resource for blog posts
  # resource :user_settings, only: [:new, :create, :edit, :update]
  resources :camera_credentials, only: [:new, :create, :edit, :update]
  resources :videos, only: [:index, :create, :update, :destroy]
  get 'api/videos', to: 'videos#api_index'
end
