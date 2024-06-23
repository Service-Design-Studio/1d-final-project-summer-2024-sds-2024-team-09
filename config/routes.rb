Rails.application.routes.draw do
  root 'movies#index'


  resources :movies

  get 'camera', to: 'movies#camera'

  get 'camera_broadcast', to: 'movies#camera_broadcast'

  get 'user', to: 'movies#user'

  get 'user_page', to: 'movies#user', as: 'user_page'

  get 'index_page', to: 'movies#index', as: 'index_page'



end
