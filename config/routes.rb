Rails.application.routes.draw do
  devise_for :users
  root 'home#index'

  # get 'hello_world', to: 'hello_world#index'
  get 'home', to: 'home#index'
  get 'users', to: 'users#index', as: 'user_root' #creates users root path
  get 'users/show/:id', to: 'users#show', as: 'current_user_path' #creates user profile path

  resources 'score_cards' do
    resources 'holes'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
