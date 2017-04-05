Rails.application.routes.draw do
  root 'home#index'

  get 'hello_world', to: 'hello_world#index'
  get 'home', to: 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
