Rails.application.routes.draw do
  resources :signal_data, only: [:create, :show]
  get '/signal_data/:room', to: 'signal_data#show'
  post '/signal_data', to: 'signal_data#create'
  post '/create_room', to: 'rooms#create'
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
end
