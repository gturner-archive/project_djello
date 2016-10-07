Rails.application.routes.draw do

  devise_for :users
  root to: 'single_pages#show'

  scope :api do
    scope :v1 do
      resources :boards, only: [:index, :create, :destroy, :update]
      resources :lists, only: [:create, :destroy, :index, :update]
      resources :cards, only: [:index]
    end
  end

end
