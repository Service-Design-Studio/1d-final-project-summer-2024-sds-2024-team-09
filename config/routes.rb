
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
  post 'logout', to: 'sessions#destroy'

  # Example additional routes
  get 'camera', to: 'pages#camera'
  get 'camera_broadcast', to: 'pages#camera_broadcast'
  get 'user', to: 'pages#user'
  get 'record', to: 'videos#index'
  get 'video', to: 'videos#list'
  get 'history', to: 'videos#history'
  get 'home', to: 'pages#index'
  get 'video-history', to: 'pages#video_history'

  namespace :api do
    namespace :v1 do
      post 'login', to: 'sessions#create'
      delete 'logout', to: 'sessions#destroy'
    end
  end

  resources :users, only: [:new, :create, :show, :index] do
    resources :cameras, only: [:new, :create, :show, :index]
  end

  resources :users, only: [:new, :create, :show, :destroy]
  resources :posts # Example resource for blog posts
  resource :user_settings, only: [:new, :create, :edit, :update]
  resources :videos, only: [:index, :show, :edit, :create, :update, :destroy]

  # resources :sessions, only: [:new, :create, :destroy]
  get 'api/videos', to: 'videos#api_index'

  # Namespaced API routes
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :show, :update, :destroy]
      resources :sessions, only: [:create]
      resources :videos, only: [:index, :show, :create, :update, :destroy]
    end
    resources :videos, only: [:index, :create, :destroy, :update]
  end
end
